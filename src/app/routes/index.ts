import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { CategoryRoutes } from "../modules/Category";


const router = Router();

router.use("/auth", AuthRoutes);
router.use("/categories", CategoryRoutes);

export default router;