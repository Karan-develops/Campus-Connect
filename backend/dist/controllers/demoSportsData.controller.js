import { Facility, SportsProgram, } from "../models/demoSportsProgramData.models.js";
export const getDemoSportsData = async (req, res) => {
    try {
        const sportsPrograms = await SportsProgram.find();
        const facilities = await Facility.find();
        res.json({ sportsPrograms, facilities });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
};
