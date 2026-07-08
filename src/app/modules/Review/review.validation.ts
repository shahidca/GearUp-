import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    gearItemId: z.string().uuid(),

    rating: z
      .number()
      .int()
      .min(1)
      .max(5),

    comment: z
      .string()
      .optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
};