import { Router } from "express";
import { UserRole } from "@prisma/client";
import { ProviderController } from "./provider.controller";
import { ProviderValidation } from "./provider.validation";
import { auth, validateRequest } from "../../middleware";

const router = Router();

router.get(
  "/orders",
  auth(UserRole.PROVIDER),
  ProviderController.getProviderOrders
);

router.patch(
  "/orders/:id",
  auth(UserRole.PROVIDER),
  validateRequest(
    ProviderValidation.updateOrderStatusValidationSchema
  ),
  ProviderController.updateOrderStatus
);

export const ProviderRoutes = router;