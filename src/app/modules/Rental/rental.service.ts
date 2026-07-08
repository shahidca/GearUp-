import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config";
import { TCreateRental } from "./rental.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { RentalStatus } from "@prisma/client";


const createRental = async (
  user: JwtPayload,
  payload: TCreateRental
) => {

  // 1. Check Customer Exists

  const customer = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });


  if (!customer) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Customer not found"
    );
  }



  // 2. Validate Rental Dates

  const startDate = new Date(payload.startDate);
  const endDate = new Date(payload.endDate);


  const today = new Date();
  today.setHours(0, 0, 0, 0);


  if (startDate < today) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Start date cannot be in the past"
    );
  }


  if (endDate <= startDate) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "End date must be after start date"
    );
  }



  // 3. Check All Gear Exists

  const gearIds = payload.items.map(
    (item) => item.gearItemId
  );


  const gears = await prisma.gearItem.findMany({
    where: {
      id: {
        in: gearIds,
      },
    },
  });


  if (gears.length !== gearIds.length) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "One or more gear items not found"
    );
  }


  // 4. Check Available Stock

  for (const item of payload.items) {

    const gear = gears.find(
      (g) => g.id === item.gearItemId
    );


    if (!gear) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Gear not found"
      );
    }


    if (gear.availableStock < item.quantity) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `${gear.name} has only ${gear.availableStock} item(s) available`
      );
    }

  }


  // 5. Calculate Rental Days


  const millisecondsPerDay =
    1000 * 60 * 60 * 24;


  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) /
      millisecondsPerDay
  );


  if (totalDays < 1) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Rental duration must be at least 1 day"
    );
  }

  // 6. Calculate Rental Amount


  let subtotal = 0;


  const rentalItems = payload.items.map(
    (item) => {

      const gear = gears.find(
        (g) => g.id === item.gearItemId
      )!;


      const pricePerDay = Number(
        gear.pricePerDay
      );


      const itemSubtotal =
        pricePerDay *
        item.quantity *
        totalDays;


      subtotal += itemSubtotal;



      return {

        gearItemId: gear.id,

        quantity: item.quantity,

        pricePerDay,

        totalDays,

        subtotal: itemSubtotal,

      };

    }
  );


  const totalAmount = subtotal;


  // 7 & 8. Create Rental + Update Stock

  const rentalOrder = await prisma.$transaction(
    async (transaction) => {


      // Create Rental Order

      const order =
        await transaction.rentalOrder.create({

          data: {

            customerId: customer.id,

            startDate,

            endDate,

            subtotal,

            totalAmount,

            status: "PLACED",


            rentalItems: {

              create: rentalItems.map(
                (item) => ({

                  gearItemId:
                    item.gearItemId,

                  quantity:
                    item.quantity,

                  pricePerDay:
                    item.pricePerDay,

                  totalDays:
                    item.totalDays,

                  subtotal:
                    item.subtotal,

                })
              ),

            },

          },


          include: {

            rentalItems: true,

          },

        });


      // Update Gear Stock

      for (const item of rentalItems) {


        await transaction.gearItem.update({

          where: {

            id: item.gearItemId,

          },


          data: {

            availableStock: {

              decrement: item.quantity,

            },

          },

        });


      }


      return order;

    }
  );


  return rentalOrder;

};

const getMyRentals = async (user: JwtPayload) => {
  const rentals = await prisma.rentalOrder.findMany({
    where: {
      customerId: user.userId,
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentals;
};

const getRentalById = async (
  user: JwtPayload,
  rentalId: string
) => {
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id: rentalId,
      customerId: user.userId,
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
      payment: true,
    },
  });

  if (!rental) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Rental not found"
    );
  }

  return rental;
};

const cancelRental = async (
  user: JwtPayload,
  rentalId: string
) => {
  // Find Rental
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id: rentalId,
      customerId: user.userId,
    },
    include: {
      rentalItems: true,
    },
  });

  if (!rental) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Rental not found"
    );
  }

  // Only PLACED rental can be cancelled
  if (rental.status !== "PLACED") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Only placed rentals can be cancelled"
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    // Restore Stock
    for (const item of rental.rentalItems) {
      await tx.gearItem.update({
        where: {
          id: item.gearItemId,
        },
        data: {
          availableStock: {
            increment: item.quantity,
          },
        },
      });
    }

    // Update Rental Status
    const updatedRental = await tx.rentalOrder.update({
      where: {
        id: rental.id,
      },
      data: {
        status: "CANCELLED",
      },
      include: {
        rentalItems: {
          include: {
            gearItem: true,
          },
        },
        payment: true,
      },
    });

    return updatedRental;
  });

  return result;
};

const confirmRental = async (
  user: JwtPayload,
  rentalId: string
) => {
  // Find Rental
  const rental = await prisma.rentalOrder.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
    },
  });

  if (!rental) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Rental not found"
    );
  }

  // Rental must contain at least one item
  if (rental.rentalItems.length === 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Rental has no items"
    );
  }

  // Check Provider Ownership
  const isProviderOwner = rental.rentalItems.every(
    (item) => item.gearItem.providerId === user.userId
  );

  if (!isProviderOwner) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to confirm this rental"
    );
  }

  // Already confirmed
  if (rental.status !== "PLACED") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Rental already ${rental.status.toLowerCase()}`
    );
  }

  // Update Status
  const result = await prisma.rentalOrder.update({
    where: {
      id: rental.id,
    },
    data: {
      status: "CONFIRMED",
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
    },
  });

  return result;
};

const pickupRental = async (
  user: JwtPayload,
  rentalId: string
) => {
  const rental = await prisma.rentalOrder.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
    },
  });

  if (!rental) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Rental not found"
    );
  }

  const isProviderOwner = rental.rentalItems.every(
    (item) => item.gearItem.providerId === user.userId
  );

  if (!isProviderOwner) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to update this rental"
    );
  }

  if (rental.status !== RentalStatus.CONFIRMED) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Rental must be CONFIRMED before pickup"
    );
  }

  return await prisma.rentalOrder.update({
    where: {
      id: rentalId,
    },
    data: {
      status: RentalStatus.PICKED_UP,
      pickupDate: new Date(),
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
    },
  });
};

const returnRental = async (
  user: JwtPayload,
  rentalId: string
) => {
  const rental = await prisma.rentalOrder.findUnique({
    where: {
      id: rentalId,
    },
    include: {
      rentalItems: {
        include: {
          gearItem: true,
        },
      },
    },
  });

  if (!rental) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Rental not found"
    );
  }

  const isProviderOwner = rental.rentalItems.every(
    (item) => item.gearItem.providerId === user.userId
  );

  if (!isProviderOwner) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to update this rental"
    );
  }

  if (rental.status !== RentalStatus.PICKED_UP) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Rental must be PICKED_UP before return"
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    for (const item of rental.rentalItems) {
      await tx.gearItem.update({
        where: {
          id: item.gearItemId,
        },
        data: {
          availableStock: {
            increment: item.quantity,
          },
        },
      });
    }

    return await tx.rentalOrder.update({
      where: {
        id: rentalId,
      },
      data: {
        status: RentalStatus.RETURNED,
        returnDate: new Date(),
      },
      include: {
        rentalItems: {
          include: {
            gearItem: true,
          },
        },
      },
    });
  });

  return result;
};

export const RentalService = {
  createRental,
  getMyRentals,
  getRentalById,
  cancelRental,
  confirmRental,
  pickupRental,
  returnRental,
};