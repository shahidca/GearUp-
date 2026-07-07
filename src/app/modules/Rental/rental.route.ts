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


router.get("/my-rentals", auth(UserRole.CUSTOMER),
  RentalController.getMyRentals
);

router.get("/:rentalId", auth(UserRole.CUSTOMER),
  RentalController.getRentalById
);
export const RentalRoutes = router;