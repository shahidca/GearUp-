import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../config";
import { TCreateGear, TGearFilterRequest } from "./gear.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TPaginationReturn } from "../../utils/paginationHelper";
import { Prisma } from "@prisma/client";

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

const getAllGear = async (
  filters: TGearFilterRequest,
  paginationOptions: TPaginationReturn
) => {
  const {
    searchTerm,
    categoryId,
    brand,
    condition,
    minPrice,
    maxPrice,
  } = filters;

  const {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  } = paginationOptions;

  const andConditions: Prisma.GearItemWhereInput[] = [];

  // Search
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // Category Filter
  if (categoryId) {
    andConditions.push({
      categoryId,
    });
  }

  // Brand Filter
  if (brand) {
    andConditions.push({
      brand: {
        equals: brand,
        mode: "insensitive",
      },
    });
  }

  // Condition Filter
  if (condition) {
    andConditions.push({
      condition,
    });
  }

  // Min Price
  if (minPrice) {
    andConditions.push({
      pricePerDay: {
        gte: new Prisma.Decimal(minPrice),
      },
    });
  }

  // Max Price
  if (maxPrice) {
    andConditions.push({
      pricePerDay: {
        lte: new Prisma.Decimal(maxPrice),
      },
    });
  }

  const whereConditions: Prisma.GearItemWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const [data, total] = await prisma.$transaction([
    prisma.gearItem.findMany({
      where: whereConditions,
      skip,
      take: limit,
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
      orderBy: sortBy
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    }),

    prisma.gearItem.count({
      where: whereConditions,
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  };
};

const getSingleGear = async (id: string) => {
  const result = await prisma.gearItem.findUnique({
    where: {
      id,
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
      reviews: true,
    },
  });

  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Gear not found"
    );
  }

  return result;
};

const updateGear = async (user: JwtPayload, id: string, payload: Partial<TCreateGear>) => {

  // 1. Check gear exists
  const existingGear = await prisma.gearItem.findUnique({
    where: {
      id,
    },
  });

  if (!existingGear) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Gear not found"
    );
  }

  // 2. Only owner can update
  if (existingGear.providerId !== user.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to update this gear"
    );
  }

  // 3. Category validation
  if (payload.categoryId) {
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
  }

  // 4. Slug validation
  if (payload.slug) {
    const slugExists = await prisma.gearItem.findFirst({
      where: {
        slug: payload.slug,
        NOT: {
          id,
        },
      },
    });

    if (slugExists) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "Gear slug already exists"
      );
    }
  }

  // 5. Stock validation
  if (
    payload.stock !== undefined &&
    payload.availableStock !== undefined &&
    payload.availableStock > payload.stock
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Available stock cannot be greater than stock"
    );
  }

  // 6. Update
  const result = await prisma.gearItem.update({
    where: {
      id,
    },
    data: payload,
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

const deleteGear = async (user: JwtPayload, id: string) => {
  // 1. Check gear exists
  const gear = await prisma.gearItem.findUnique({
    where: {
      id,
    },
  });

  if (!gear) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Gear not found"
    );
  }

  // 2. Check owner
  if (gear.providerId !== user.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to delete this gear"
    );
  }

  // 3. Delete gear
  await prisma.gearItem.delete({
    where: {
      id,
    },
  });

  return null;
};

export const GearService = {
  createGear,
  getAllGear,
  getSingleGear,
  updateGear,
  deleteGear,
};