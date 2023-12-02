import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import allRoutes from "./routers/index.js";

dotenv.config();

// configuring express
const app = express();

// configuring cors and middlewares
app.use(express.json());
app.use(cors());

// routing to start with /api/
app.use("/api", allRoutes);

export default app;
