import { Router } from "express";
import { UserRole } from "@prisma/client";
import { auth, validateRequest } from "../../middleware";
import { GearController } from "./gear.controller";
import { GearValidation } from "./gear.validation";

const router = Router();

router.post("/", auth(UserRole.PROVIDER),
  validateRequest(GearValidation.createGearValidationSchema),
  GearController.createGear
);

export const GearRoutes = router;