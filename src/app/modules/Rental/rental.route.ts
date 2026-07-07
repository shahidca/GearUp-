import { Router } from "express";
import { UserRole } from "@prisma/client";

import { auth, validateRequest } from "../../middleware";

import { RentalController } from "./rental.controller";
import { RentalValidation } from "./rental.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.CUSTOMER),
  validateRequest(
    RentalValidation.createRentalValidationSchema
  ),
  RentalController.createRental
);

export const RentalRoutes = router;