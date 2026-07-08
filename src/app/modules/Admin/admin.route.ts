import { Router } from "express";
import { UserRole } from "@prisma/client";

import { auth, validateRequest } from "../../middleware";

import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.get(
  "/users",
  auth(UserRole.ADMIN),
  AdminController.getAllUsers
);

router.patch(
  "/users/:id",
  auth(UserRole.ADMIN),
  validateRequest(
    AdminValidation.updateUserStatusValidationSchema
  ),
  AdminController.updateUserStatus
);

router.get(
  "/gear",
  auth(UserRole.ADMIN),
  AdminController.getAllGear
);

router.get(
  "/rentals",
  auth(UserRole.ADMIN),
  AdminController.getAllRentals
);

export const AdminRoutes = router;