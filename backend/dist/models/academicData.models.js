import mongoose, { Schema } from "mongoose";
const ProgramSchema = new Schema({
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
const Program = mongoose.model("Program", ProgramSchema);
export default Program;
