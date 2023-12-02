import { sendResponse } from "../utils/index.js";

export const taskMiddleWare = {
  createTaskMiddleware: (req, res, next) => {
    try {
      const { title, description } = req.body;
      if (!title || title?.length === 0)
        return sendResponse.error(res, { error: "Title cannot be blank" });
      else if (!description || description?.length === 0)
        return sendResponse.error(res, { error: "Description cannot be blank" });
      next();
    } catch (error) {
      sendResponse.serverError(res);
    }
  },
};
