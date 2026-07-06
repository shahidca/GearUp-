import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Category name must be at least 2 characters"),

    slug: z
      .string()
      .min(2)
      .toLowerCase(),

    description: z
      .string()
      .optional(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),

    slug: z.string().optional(),

    description: z.string().optional(),

    isActive: z.boolean().optional(),
  }),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};