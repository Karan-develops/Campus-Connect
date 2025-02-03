import { connectDb } from "../db/connectDb";
import {
  Placement,
  Recruiter,
  SuccessStory,
} from "../models/demoPlacements.models";

const placementStats = [
  { year: "2023", percentage: 95, averageSalary: "₹12.5 LPA" },
  { year: "2022", percentage: 92, averageSalary: "₹11.8 LPA" },
  { year: "2021", percentage: 88, averageSalary: "₹10.5 LPA" },
];

const topRecruiters = [
  { name: "TechCorp", logo: "/placeholder.svg?height=100&width=100" },
  { name: "InnovaSoft", logo: "/placeholder.svg?height=100&width=100" },
];

const successStories = [
  {
    name: "Priya Sharma",
    batch: "2023",
    company: "TechCorp",
    role: "Software Engineer",
    image: "/placeholder.svg?height=100&width=100",
    quote: "The placement cell helped me land my dream job at TechCorp.",
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
  process.exit();
};

seedDatabase();
