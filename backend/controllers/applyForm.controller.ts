import { Request, Response } from "express";
import Application, { IApplication } from "../models/applyForm.models.js";

export const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body;

    const existingApplication = await Application.findOne({ userId });
    if (existingApplication) {
      res
        .status(400)
        .json({ error: "An application already exists for this user." });
      return;
    }

    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const applications: IApplication[] = await Application.find();
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application: IApplication | null = await Application.findById(
      req.params.id
    );
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json(application);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getApplicationByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application: IApplication | null = await Application.findOne({
      userId: req.params.userId,
    });
    if (!application) {
      res.status(404).json({ error: "Application not found for this user" });
      return;
    }
    res.json(application);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application: IApplication | null =
      await Application.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json(application);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application: IApplication | null =
      await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    res.json({ message: "Application deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
