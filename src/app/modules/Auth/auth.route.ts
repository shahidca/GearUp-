import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { auth, validateRequest } from "../../middleware";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.registerUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.get(
  "/me",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
  AuthController.getMe
);


export const AuthRoutes = router;