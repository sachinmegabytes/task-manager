import db from '../config/database.js';

export const createTaskTable = async () => {
  const createTaskTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

  try {
    await db.execute(createTaskTableQuery);
  } catch (error) {
    throw new Error(error);
  }
};
