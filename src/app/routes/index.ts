import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CategoryRoutes } from "../modules/Category";
import { GearRoutes } from "../modules/Gear";



const router = Router();

router.use("/auth", AuthRoutes);
router.use("/categories", CategoryRoutes);
router.use("/gear", GearRoutes);
router.use("/provider/gear", GearRoutes);


export default router;