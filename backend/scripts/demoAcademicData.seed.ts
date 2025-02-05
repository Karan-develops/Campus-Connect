import mongoose from "mongoose";
import Program from "../models/academicData.models.js";
import programData from "./data/demoAcaData.js";
import { connectDb } from "../db/connectDb.js";

const seedDatabase = async () => {
  try {
    connectDb();

    console.log("Connected to MongoDB ✅");

    // Clear existing data to prevent duplicates
    await Program.deleteMany({});
    console.log("Existing programs deleted.");

    // Insert new data
    const programArray = Object.keys(programData).map((key) => ({
      name: key,
      ...programData[key],
    }));

    await Program.insertMany(programArray);
    console.log("Programs seeded successfully 🎉");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
