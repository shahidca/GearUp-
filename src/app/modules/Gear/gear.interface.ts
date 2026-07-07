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

  condition?: string;

  minPrice?: string;

  maxPrice?: string;
};