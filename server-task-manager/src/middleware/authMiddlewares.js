import { sendResponse, hashAuth } from "../utils/index.js";
import { isValidEmail } from "../utils/auth.js"

export const authMiddleWare = {
  signup: (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      if (username && username?.length <= 3) {
        return sendResponse.error(res, {
          message: "Please enter an username with more than 3 characters",
        });
      } else if (email && !isValidEmail(email)) {
        return sendResponse.error(res, {
          message: "Please enter a valid email address",
        });
      } else if (password && password?.length < 6) {
        return sendResponse.error(res, {
          message: "Please enter a password with at least 6 characters",
        });
      }
      next();
    } catch (error) {
      return sendResponse.serverError(res);
    }
  },

  authenticateToken: (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]?.replace('"', '');
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });

    const decoded = hashAuth.verifyToken(token);
    if (!decoded)
      return res.status(401).json({ success: false, message: "Invalid token" });
    req.params.userId = decoded;
    next();
  },
};

