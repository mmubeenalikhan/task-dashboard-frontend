import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`);
  return response.data;
};

export const bulkCreateTasks = async (tasks) => {
  const response = await axios.post(`${API_URL}/tasks/bulk`, { tasks });
  return response.data;
};
