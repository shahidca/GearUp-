import { Router } from "express";
import { UserRole } from "@prisma/client";
import { auth, validateRequest } from "../../middleware";
import { GearController } from "./gear.controller";
import { GearValidation } from "./gear.validation";

const router = Router();

// Public Routes
router.get("/", GearController.getAllGear);

router.get("/:id", GearController.getSingleGear
);

// Provider Routes
router.post("/", auth(UserRole.PROVIDER),
  validateRequest(GearValidation.createGearValidationSchema),
  GearController.createGear
);

router.patch("/:id", auth(UserRole.PROVIDER), validateRequest(
  GearValidation.updateGearValidationSchema
  ),
  GearController.updateGear
);

router.delete("/:id", auth(UserRole.PROVIDER),
  GearController.deleteGear
);

export const GearRoutes = router;