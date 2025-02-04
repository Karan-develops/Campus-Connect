import {
  Placement,
  Recruiter,
  SuccessStory,
} from "../models/demoPlacements.models.js";
import { Request, Response } from "express";

export const getPlacementsData = async (req: Request, res: Response) => {
  try {
    const placements = await Placement.find();
    const recruiters = await Recruiter.find();
    const successStories = await SuccessStory.find();
    res.json({ placements, recruiters, successStories });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
