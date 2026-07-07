import { z } from "zod";

const createRentalValidationSchema = z.object({
  body: z.object({
    startDate: z.string().datetime(),

    endDate: z.string().datetime(),

    items: z
      .array(
        z.object({
          gearItemId: z.uuid(),

          quantity: z
            .number()
            .int()
            .positive(),
        })
      )
      .min(1, "At least one gear item is required"),
  }),
});

export const RentalValidation = {
  createRentalValidationSchema,
};