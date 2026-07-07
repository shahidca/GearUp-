import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config";
import { TCreateGear } from "./gear.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";

const createGear = async (user: JwtPayload, payload: TCreateGear) => {
  // 1. Category exists?
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Category not found"
    );
  }

  // 2. Slug already exists?
  const existingGear = await prisma.gearItem.findUnique({
    where: {
      slug: payload.slug,
    },
  });

  if (existingGear) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Gear slug already exists"
    );}

  // 3. Provider exists?
  const provider = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!provider) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Provider not found"
    );
  }

  // 4. Stock validation
  if (payload.availableStock > payload.stock) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Available stock cannot be greater than total stock"
    );
  }

  // 5. Create Gear
  const result = await prisma.gearItem.create({
    data: {
      ...payload,
      providerId: user.userId,
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return result;
};
export const GearService = {
  createGear,
};