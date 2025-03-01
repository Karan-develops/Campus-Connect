import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  getApplicationByUserId,
  updateApplication,
  deleteApplication,
} from "../controllers/applyForm.controller.js";

const router = express.Router();

router.post("/", createApplication);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.get("/user/:userId", getApplicationByUserId);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
