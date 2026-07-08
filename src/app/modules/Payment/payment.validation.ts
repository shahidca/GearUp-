import { z } from "zod";

const createPaymentValidationSchema = z.object({
  body: z.object({
    rentalOrderId: z.string().uuid(),
  }),
});

const confirmPaymentValidationSchema = z.object({
  body: z.object({
    paymentIntentId: z.string(),
  }),
});


export const PaymentValidation = {
  createPaymentValidationSchema,
  confirmPaymentValidationSchema,
};