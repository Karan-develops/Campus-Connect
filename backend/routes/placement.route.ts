import { Router } from "express";
import { getPlacementsData } from "../controllers/placement.controller.js";

const router = Router();

router.get("/", getPlacementsData);

export default router;