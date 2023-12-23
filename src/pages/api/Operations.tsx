// api.js
import axios from "axios";

export const fetchTaskList = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/taskm/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTaskToList = async (
  title: string,
  description: string,
  dueDate: string
) => {
  try {
    await axios.post("http://127.0.0.1:8000/taskm/insert", {
      title,
      description,
      dueDate,
    });

    // Fetch the updated task list
    const data = await fetchTaskList();
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};
export const updateTask = async (
  id: number,
  title: string,
  description: string,
  dueDate: string
) => {
  try {
    await axios.put(`http://127.0.0.1:8000/taskm/update/${id}`, {
      title,
      description,
      dueDate,
    });

    // Fetch the updated task list
    const data = await fetchTaskList();
    return data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await axios.post(`http://127.0.0.1:8000/taskm/delete/${id}`);
    // Fetch the updated task list
    const data = await fetchTaskList();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
