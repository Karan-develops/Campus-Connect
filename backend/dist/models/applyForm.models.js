import mongoose, { Schema } from "mongoose";
const ApplicationSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    program: { type: String, required: true },
    previousSchool: { type: String, required: true },
    gpa: { type: Number, required: true },
    essay: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
}, { timestamps: true });
export default mongoose.model("Application", ApplicationSchema);
