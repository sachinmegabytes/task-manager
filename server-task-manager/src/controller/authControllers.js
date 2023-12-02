import { sendResponse, hashAuth } from '../utils/index.js';
import db from '../config/database.js';

export const auth = {
  // This is for signup
  registerController: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // Hashing the password
      const encryptedPassword = await hashAuth.encryptPassword(password);

      // Query to generate the table for the user
      await db.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `);

      // checking the existing user
      const [existingUsers] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      // Returns error with status code 400 for signing up with a existing email
      if (existingUsers.length > 0) {
        const response = {
          message:
            'Email already exists. Please use a different email address.',
        };
        return sendResponse.error(res, response, 400);
      }

      // Query to insert the user
      await db.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, encryptedPassword]
      );

      const successResponse = {
        message: 'User registered successfully',
      };
      return sendResponse.success(res, successResponse);
    } catch (error) {
      return sendResponse.error(res, { error });
    }
  },

  loginController: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Query to check if email exists in the db
      const [existingUsers] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );

      // if user doesn't exist
      if (existingUsers.length === 0) {
        let response = {
          message: 'User not found. Please check your email or register.',
        };
        return sendResponse.error(res, response, 404);
      }

      const user = existingUsers[0];
      const isValidPassword = await hashAuth.passwordMatch(
        password,
        user.password
      );

      // if exist and credentials are not valid
      if (!isValidPassword) {
        const response = {
          message: 'Incorrect password. Please try again.',
        };
        return sendResponse.error(res, response, 401);
      }

      // On successful login
      const response = {
        message: 'Login successful',
        token: hashAuth.generateToken(user?.id, user?.name),
      };
      return sendResponse.success(res, response);
    } catch (error) {
      return sendResponse.error(res, { error });
    }
  },

  getUserController: async (req, res) => {
    try {
      const userId = req.params.userId;
      const [userData] = await db.execute('SELECT * FROM users WHERE id = ?', [
        userId,
      ]);
      if (!userData || userData.length === 0) {
        return sendResponse.error(res, 404, { message: 'User not found' });
      }
      const user = {
        id: userData[0]?.id,
        email: userData[0]?.email,
        name: userData[0]?.name,
      };
      return sendResponse.success(res, { user });
    } catch (err) {
      return sendResponse.serverError(res);
    }
  },
};
