import db from '../config/database.js';
import { createTaskTable } from '../migrations/task.js';
import { sendResponse } from '../utils/index.js';

export const task = {
  createTask: async (req, res) => {
    try {
      await createTaskTable();
      const userId = req.params?.userId;
      const { title, description } = req.body;

      // Adding task to DB with details
      const [result] = await db.execute(
        'INSERT INTO tasks (user_id, title, description, created_at) VALUES (?, ?, ?, NOW())',
        [userId, title, description]
      );

      // Fetching task ID in order to share in response
      const taskId = result.insertId;

      const response = {
        message: 'Task created successfully',
        task: {
          id: taskId,
          user_id: userId,
          title,
          description,
          created_at: new Date().toISOString(),
        },
      };

      return sendResponse.success(res, response);
    } catch (error) {
      return sendResponse.error(res, { error });
    }
  },

  getAllTask: async (req, res) => {
    try {
      const userId = req.params?.userId;

      // Query to fetch all tasks
      const [tasks] = await db.execute(
        'SELECT * FROM tasks WHERE user_id = ?',
        [userId]
      );

      const response = {
        total: tasks?.length,
        tasks,
      };

      return sendResponse.success(res, response);
    } catch (error) {
      return sendResponse.error(res, { error });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const userId = req.params.userId;

      // Query to fetch individual task as per requested ID
      const [task] = await db.execute(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, userId]
      );

      if (task.length === 0) {
        const response = {
          message: 'Task not found or deleted',
        };
        return sendResponse.error(res, response, 404);
      }

      const response = {
        task: task[0],
      };

      return sendResponse.success(res, response);
    } catch (error) {
      return sendResponse.error(res, { error });
    }
  },

  updateTaskById: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const userId = req.params.userId;
      const { title, description } = req.body;

      // Query to fetch individual task for updating
      const [existingTask] = await db.execute(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, userId]
      );

      if (existingTask.length === 0) {
        const response = {
          message: 'Task not found or deleted',
        };
        return sendResponse.error(res, response, 404);
      }

      // If task exist then this query will run to update
      await db.execute(
        'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?',
        [title, description, taskId, userId]
      );

      const response = {
        message: 'Task updated successfully',
      };

      return sendResponse.success(res, response);
    } catch (error) {
      return sendResponse.error(res, { error });
    }
  },

  deleteTaskById: async (req, res) => {
    try {
      const taskId = req.params?.taskId;
      const userId = req.params?.userId;

      // Query to fetch individual task for deleting
      const [existingTask] = await db.execute(
        'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
        [taskId, userId]
      );

      if (existingTask.length === 0) {
        const response = {
          message: 'Task not found or already deleted',
        };
        return sendResponse.error(res, response, 404);
      }

      // If task exist then this query will run to delete
      await db.execute('DELETE FROM tasks WHERE id = ? AND user_id = ?', [
        taskId,
        userId,
      ]);

      const response = {
        message: 'Task deleted successfully',
      };

      return sendResponse.success(res, response);
    } catch (error) {
      return sendResponse.error(res, { error });
    }
  },
};
