import { Router } from "express";
import { UserRole } from "@prisma/client";
import { auth, validateRequest } from "../../middleware";
import { PaymentController } from "./payment.controller";
import { PaymentValidation } from "./payment.validation";

const router = Router();

router.post(
  "/create",
  auth(UserRole.CUSTOMER),
  validateRequest(
    PaymentValidation.createPaymentValidationSchema
  ),
  PaymentController.createPayment
);

router.post(
  "/confirm",
  validateRequest(
    PaymentValidation.confirmPaymentValidationSchema
  ),
  PaymentController.confirmPayment
);

router.get(
  "/",
  auth(UserRole.CUSTOMER),
  PaymentController.getMyPayments
);

router.get(
  "/:id",
  auth(UserRole.CUSTOMER),
  PaymentController.getPaymentById
);

export const PaymentRoutes = router;