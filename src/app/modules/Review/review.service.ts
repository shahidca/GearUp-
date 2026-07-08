import { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../../config";
import AppError from "../../errors/AppError";

import { TCreateReview } from "./review.interface";

const createReview = async (
  user: JwtPayload,
  payload: TCreateReview
) => {
  // 1. Check Gear Exists

  const gear = await prisma.gearItem.findUnique({
    where: {
      id: payload.gearItemId,
    },
  });

  if (!gear) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Gear not found"
    );
  }

  // 2. Customer must have returned this gear

  const rental = await prisma.rentalOrder.findFirst({
    where: {
      customerId: user.userId,
      status: "RETURNED",

      rentalItems: {
        some: {
          gearItemId: payload.gearItemId,
        },
      },
    },
  });

  if (!rental) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You can review only returned rental items"
    );
  }

  // 3. Prevent Duplicate Review

  const alreadyReviewed =
    await prisma.review.findUnique({
      where: {
        customerId_gearItemId: {
          customerId: user.userId,
          gearItemId: payload.gearItemId,
        },
      },
    });

  if (alreadyReviewed) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You have already reviewed this gear"
    );
  }

  // 4. Create Review

  const review = await prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,

      customerId: user.userId,

      gearItemId: payload.gearItemId,
    },

    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      gearItem: true,
    },
  });

  return review;
};

export const ReviewService = {
  createReview,
};