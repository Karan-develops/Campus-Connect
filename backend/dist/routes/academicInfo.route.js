import { Router } from "express";
import { getAllPrograms, getProgramByName, } from "../controllers/academicInfo.controller.js";
const router = Router();
router.get("/", getAllPrograms);
router.get("/:name", async (req, res) => {
    await getProgramByName(req, res);
});
export default router;
