import { Router } from "express";
import { UserRole } from "@prisma/client";

import { auth, validateRequest } from "../../middleware";

import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.CUSTOMER),
  validateRequest(
    ReviewValidation.createReviewValidationSchema
  ),
  ReviewController.createReview
);

export const ReviewRoutes = router;