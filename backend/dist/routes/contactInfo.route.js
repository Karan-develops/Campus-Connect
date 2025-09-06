import express from "express";
import { submitContactForm } from "../controllers/contactInfo.controller.js";
const router = express.Router();
router.post("/", async (req, res) => {
    await submitContactForm(req, res);
});
export default router;
