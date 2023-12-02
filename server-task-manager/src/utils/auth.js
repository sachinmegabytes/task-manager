import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashAuth = {
  encryptPassword: async (password) => {
    const salt = bcrypt.genSaltSync(11);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },

  passwordMatch: async (password, encryptPassword) => {
    return await bcrypt.compare(password, encryptPassword);
  },

  generateToken: (payload) => {
    return jwt.sign(payload, process.env.SECURITY_TOKEN_KEY, {});
  },

  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.SECURITY_TOKEN_KEY);
      return decoded;
    } catch (error) {
      throw new Error(error);
    }
  },
};

// A reusable function to check if email is in valid format or no
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};