import mongoose, { Schema, Document } from "mongoose";

interface Course {
  name: string;
  year: number;
}

interface Faculty {
  name: string;
  role: string;
  image: string;
}

interface Statistics {
  placementRate: number;
  averageSalary: string;
  internshipPartners: number;
  researchPublications: number;
}

interface IProgram extends Document {
  name: string;
  description: string;
  duration: string;
  credits: number;
  careers: string[];
  courses: Course[];
  faculty: Faculty[];
  statistics: Statistics;
}

const ProgramSchema = new Schema<IProgram>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  credits: { type: Number, required: true },
  careers: { type: [String], required: true },
  courses: [
    {
      name: { type: String, required: true },
      year: { type: Number, required: true },
    },
  ],
  faculty: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
      image: { type: String, default: "" },
    },
  ],
  statistics: {
    placementRate: { type: Number, required: true },
    averageSalary: { type: String, required: true },
    internshipPartners: { type: Number, required: true },
    researchPublications: { type: Number, required: true },
  },
});

const Program = mongoose.model<IProgram>("Program", ProgramSchema);
export default Program;
