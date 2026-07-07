import { GearCondition } from "@prisma/client";
import { z } from "zod";

const createGearValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),

    slug: z.string().min(2).toLowerCase(),

    description: z.string().min(10),

    brand: z.string().optional(),

    model: z.string().optional(),

    pricePerDay: z.number().positive(),

    stock: z.number().int().min(1),

    availableStock: z.number().int().min(0),

    condition: z.nativeEnum(GearCondition),

    images: z
      .array(z.url())
      .min(1, "At least one image is required"),

    specifications: z.record(z.string(), z.any()).optional(),

    categoryId: z.uuid(),
  }),
});

const updateGearValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),

    slug: z.string().min(2).toLowerCase().optional(),

    description: z.string().min(10).optional(),

    brand: z.string().optional(),

    model: z.string().optional(),

    pricePerDay: z.number().positive().optional(),

    stock: z.number().int().min(1).optional(),

    availableStock: z.number().int().min(0).optional(),

    condition: z.nativeEnum(GearCondition).optional(),

    images: z.array(z.url()).optional(),

    specifications: z
      .record(z.string(), z.any())
      .optional(),

    categoryId: z.uuid().optional(),
  }),
});

export const GearValidation = {
  createGearValidationSchema,
  updateGearValidationSchema,
};