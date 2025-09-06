import mongoose from "mongoose";
const sportsProgramSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});
const facilitySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
});
export const SportsProgram = mongoose.model("SportsProgram", sportsProgramSchema);
export const Facility = mongoose.model("Facility", facilitySchema);
