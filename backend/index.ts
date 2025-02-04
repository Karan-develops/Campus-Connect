import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDb } from "./db/connectDb.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsConfiguration = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfiguration));

connectDb();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "200 Ok, Hello World :)",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
