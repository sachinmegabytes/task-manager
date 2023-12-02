import express from "express";
import { authControllers } from "../controller/index.js";
import { authMiddleWare } from "../middleware/index.js";

const authRouter = express.Router();

authRouter.post(
  '/signup',
  authMiddleWare.signup,
  authControllers.registerController
);
authRouter.post("/login", authControllers.loginController);
authRouter.get(
  "/user-details",
  authMiddleWare.authenticateToken,
  authControllers.getUserController
);

export default authRouter;