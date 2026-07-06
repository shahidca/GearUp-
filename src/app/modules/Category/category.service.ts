import { Prisma } from "@prisma/client";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";

import type { TCreateCategory } from "./category.interface";
import { prisma } from "../../config";

const createCategory = async (
  payload: TCreateCategory
) => {
  const isCategoryExists =
    await prisma.category.findFirst({
      where: {
        OR: [
          {
            name: payload.name,
          },
          {
            slug: payload.slug,
          },
        ],
      },
    });

  if (isCategoryExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Category already exists"
    );
  }

  const result =
    await prisma.category.create({
      data: payload,
    });

  return result;
};

export const CategoryService = {
  createCategory,
};