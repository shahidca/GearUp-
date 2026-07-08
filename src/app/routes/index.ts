import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CategoryRoutes } from "../modules/Category";
import { GearRoutes } from "../modules/Gear";
import { RentalRoutes } from "../modules/Rental";
import { ProviderRoutes } from "../modules/Provider";
import { PaymentRoutes } from "../modules/Payment";




const router = Router();

router.use("/auth", AuthRoutes);
router.use("/categories", CategoryRoutes);
router.use("/gear", GearRoutes);
router.use("/provider/gear", GearRoutes);
router.use("/rentals", RentalRoutes);
router.use("/provider", ProviderRoutes);
router.use("/payments", PaymentRoutes);


export default router;