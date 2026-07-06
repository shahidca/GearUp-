import { Router } from "express";
import { UserRole } from "@prisma/client";

import { auth, validateRequest } from "../../middleware";

import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(
    CategoryValidation.createCategoryValidationSchema
  ),
  CategoryController.createCategory
);

export const CategoryRoutes = router;