import { Placement, Recruiter, SuccessStory, } from "../models/demoPlacements.models.js";
export const getPlacementsData = async (req, res) => {
    try {
        const placements = await Placement.find();
        const recruiters = await Recruiter.find();
        const successStories = await SuccessStory.find();
        res.json({ placements, recruiters, successStories });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
};
