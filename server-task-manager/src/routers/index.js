import express from "express";
import authRouter from "./authRouter.js";
import taskRouter from "./taskRouter.js";

const allRoutes = express.Router();

allRoutes.use("/auth", authRouter);
allRoutes.use("/task", taskRouter);

export default allRoutes;
