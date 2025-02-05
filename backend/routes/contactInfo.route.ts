import express, { Request, Response } from "express";
import { submitContactForm } from "../controllers/contactInfo.controller.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  await submitContactForm(req, res);
});

export default router;
