import { Router } from "express";
import { getDemoSportsData } from "../controllers/demoSportsData.controller.js";
const router = Router();
router.get("/", getDemoSportsData);
export default router;
