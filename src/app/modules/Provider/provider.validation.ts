import { z } from "zod";

const updateOrderStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([
      "CONFIRMED",
      "PICKED_UP",
      "RETURNED",
    ]),
  }),
});

export const ProviderValidation = {
  updateOrderStatusValidationSchema,
};