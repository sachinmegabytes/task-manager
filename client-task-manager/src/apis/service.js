// apiService.ts
import axios from "axios";
import { toast } from "react-toastify";

// Base API path
const API_BASE_URL = "http://localhost:8080/api";

// User services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.data.message)
    }
  },

  signup: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.data.message)
    }
  },

  getUserProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/user-details`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Get task details failed", error);
    }
  },
};

// Task Services
export const taskService = {
  addTaskApi: async (task) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/task/create`, task, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Add task failed", error);
    }
  },

  editTask: async (task) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/task/${task.id}`,
        task,
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Edit task failed", error);
    }
  },

  getTaskDetails: async (taskId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/${taskId}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Get task details failed", error);
    }
  },

  getTasksApi: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/task/get-all`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Get tasks failed", error);
    }
  },

  deleteTaskApi: async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/task/${taskId}`, {
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });
    } catch (error) {
      throw new Error("Delete task failed", error);
    }
  },
};
