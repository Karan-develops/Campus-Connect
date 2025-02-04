import mongoose from "mongoose";

const PlacementSchema = new mongoose.Schema({
  year: String,
  percentage: Number,
  averageSalary: String,
});

const RecruiterSchema = new mongoose.Schema({
  name: String,
  logo: String,
});

const SuccessStorySchema = new mongoose.Schema({
  name: String,
  batch: String,
  company: String,
  role: String,
  image: String,
  quote: String,
});

export const Placement =
  mongoose.models.Placement || mongoose.model("Placement", PlacementSchema);
export const Recruiter =
  mongoose.models.Recruiter || mongoose.model("Recruiter", RecruiterSchema);
export const SuccessStory =
  mongoose.models.SuccessStory ||
  mongoose.model("SuccessStory", SuccessStorySchema);
