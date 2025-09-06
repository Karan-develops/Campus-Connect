import { connectDb } from "../db/connectDb.js";
import { Placement, Recruiter, SuccessStory, } from "../models/demoPlacements.models.js";
import { config } from "dotenv";
config();
const placementStats = [
    { year: "2023", percentage: 95, averageSalary: "₹12.5 LPA" },
    { year: "2022", percentage: 92, averageSalary: "₹11.8 LPA" },
    { year: "2021", percentage: 88, averageSalary: "₹10.5 LPA" },
];
const topRecruiters = [
    { name: "TechCorp", logo: "" },
    { name: "InnovaSoft", logo: "" },
    { name: "DataDynamics", logo: "" },
    { name: "CloudNine", logo: "" },
    { name: "AI Solutions", logo: "" },
    { name: "CyberGuard", logo: "" },
];
const successStories = [
    {
        name: "Priya Sharma",
        batch: "2023",
        company: "TechCorp",
        role: "Software Engineer",
        image: "",
        quote: "The placement cell helped me land my dream job at TechCorp.",
    },
    {
        name: "Rahul Verma",
        batch: "2022",
        company: "DataDynamics",
        role: "Data Scientist",
        image: "",
        quote: "The skills I gained during my time at college were instrumental in securing a position as a Data Scientist at DataDynamics.",
    },
    {
        name: "Ananya Patel",
        batch: "2021",
        company: "AI Solutions",
        role: "Machine Learning Engineer",
        image: "",
        quote: "The exposure to cutting-edge technologies and industry partnerships at our college opened up amazing career opportunities for me.",
    },
];
const seedDatabase = async () => {
    await connectDb();
    await Placement.deleteMany({});
    await Recruiter.deleteMany({});
    await SuccessStory.deleteMany({});
    await Placement.insertMany(placementStats);
    await Recruiter.insertMany(topRecruiters);
    await SuccessStory.insertMany(successStories);
    console.log("Database seeded successfully!");
    globalThis.process.exit();
};
seedDatabase();
