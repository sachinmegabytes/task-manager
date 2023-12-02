import express from "express";
import { taskControllers } from "../controller/index.js";
import { authMiddleWare } from "../middleware/authMiddlewares.js";
import { taskMiddleWare } from "../middleware/taskMiddlewares.js";

const taskRouter = express.Router();

taskRouter.post(
  "/create",
  taskMiddleWare.createTaskMiddleware,
  authMiddleWare.authenticateToken,
  taskControllers.createTask
);

taskRouter.get(
  "/get-all",
  authMiddleWare.authenticateToken,
  taskControllers.getAllTask
);

taskRouter.get(
  '/:taskId',
  authMiddleWare.authenticateToken,
  taskControllers.getTaskById
);

taskRouter.put(
  '/:taskId',
  taskMiddleWare.createTaskMiddleware,
  authMiddleWare.authenticateToken,
  taskControllers.updateTaskById
);

taskRouter.delete(
  '/:taskId',
  authMiddleWare.authenticateToken,
  taskControllers.deleteTaskById
);

export default taskRouter;
