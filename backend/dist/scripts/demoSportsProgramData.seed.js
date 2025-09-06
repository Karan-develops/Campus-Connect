import mongoose from "mongoose";
import { config } from "dotenv";
import { connectDb } from "../db/connectDb.js";
import { Facility, SportsProgram, } from "../models/demoSportsProgramData.models.js";
import { facilities, sportsPrograms } from "./data/sportsProgramData.js";
config();
// Seed Function
const seedDatabase = async () => {
    try {
        connectDb();
        console.log("Connected to MongoDB");
        // Clear existing data
        await SportsProgram.deleteMany();
        await Facility.deleteMany();
        console.log("Existing data removed");
        // Insert new data
        await SportsProgram.insertMany(sportsPrograms);
        await Facility.insertMany(facilities);
        console.log("New data seeded successfully");
        mongoose.connection.close();
        console.log("Database connection closed");
    }
    catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};
// Run the seed function
seedDatabase();
