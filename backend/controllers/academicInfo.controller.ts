import { Request, Response } from "express";
import Program from "../models/academicData.models.js";

export const getAllPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await Program.find();
    res.status(200).json({ success: true, data: programs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export const getProgramByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const program = await Program.findOne({ name });

    if (!program) {
      return res
        .status(404)
        .json({ success: false, message: "Program not found" });
    }

    res.status(200).json({ success: true, data: program });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
