import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config";
import { RentalStatus } from "@prisma/client";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { TUpdateOrderStatus } from "./provider.interface";

const getProviderOrders = async (user: JwtPayload) => {
  const orders = await prisma.rentalOrder.findMany({
    where: {
      rentalItems: {
        some: {
          gearItem: {
            providerId: user.userId,
          },
        },
      },
    },

    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      rentalItems: {
        include: {
          gearItem: {
            select: {
              id: true,
              name: true,
              images: true,
              pricePerDay: true,
              providerId: true,
            },
          },
        },
      },

      payment: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

const updateOrderStatus = async (
  user: JwtPayload,
  orderId: string,
  payload: TUpdateOrderStatus
) => {
  // 1. Find Order
  const order = await prisma.rentalOrder.findFirst({
    where: {
      id: orderId,
      rentalItems: {
        some: {
          gearItem: {
            providerId: user.userId,
          },
        },
      },
    },
  });

  if (!order) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Rental order not found"
    );
  }

  // 2. Status Transition Validation

  if (
    order.status === RentalStatus.PLACED &&
    payload.status !== RentalStatus.CONFIRMED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Only CONFIRMED is allowed from PLACED status"
    );
  }

  if (
    order.status === RentalStatus.CONFIRMED &&
    payload.status !== RentalStatus.PICKED_UP
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Only PICKED_UP is allowed from CONFIRMED status"
    );
  }

  if (
    order.status === RentalStatus.PICKED_UP &&
    payload.status !== RentalStatus.RETURNED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Only RETURNED is allowed from PICKED_UP status"
    );
  }

  if (
    order.status === RentalStatus.RETURNED ||
    order.status === RentalStatus.CANCELLED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This order can no longer be updated"
    );
  }

  // 3. Update Order

  const updatedOrder = await prisma.rentalOrder.update({
    where: {
      id: order.id,
    },
    data: {
      status: payload.status,
    },
  });

  return updatedOrder;
};

export const ProviderService = {
  getProviderOrders,
  updateOrderStatus,
};