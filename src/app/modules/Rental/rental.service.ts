import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config";
import { TCreateRental } from "./rental.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";


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

export const RentalService = {
  createRental,
};