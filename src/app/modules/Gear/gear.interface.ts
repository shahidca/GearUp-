import { GearCondition, Prisma } from "@prisma/client";

export type TCreateGear = {
  name: string;
  slug: string;
  description: string;

  brand?: string;
  model?: string;

  pricePerDay: number;

  stock: number;
  availableStock: number;

  condition: GearCondition;

  images: string[];

  specifications?: Prisma.InputJsonValue;

  categoryId: string;
};

export type TGearFilterRequest = {
  searchTerm?: string;

  categoryId?: string;

  brand?: string;

  condition?: GearCondition;

  minPrice?: string;

  maxPrice?: string;

  page?: string;

  limit?: string;

  sortBy?: string;

  sortOrder?: "asc" | "desc";
};