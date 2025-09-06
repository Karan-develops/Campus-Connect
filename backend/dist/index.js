import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDb } from "./db/connectDb.js";
// Routes Import
import placementsRouter from "./routes/placement.route.js";
import contactInfoRouter from "./routes/contactInfo.route.js";
import academicInfoRouter from "./routes/academicInfo.route.js";
import sportsInfoRouter from "./routes/demoSportsData.route.js";
import applicationRouter from "./routes/applyForm.route.js";
config();
const app = express();
const PORT = process.env.PORT || 5000;
const corsConfiguration = {
    origin: ["https://campus-connect-karan.vercel.app"],
    optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfiguration));
connectDb();
// Routes
app.use("/api/placements", placementsRouter);
app.use("/api/contact-info", contactInfoRouter);
app.use("/api/academic-info", academicInfoRouter);
app.use("/api/sports-info", sportsInfoRouter);
app.use("/api/apply-form", applicationRouter);
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "200 Ok, Hello World :)",
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
