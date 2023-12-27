import React, { useState, useEffect } from "react";
import {
  fetchTaskList,
  deleteTask,
  addTaskToList,
  updateTask,
} from "../api/Operations";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

/**
 * 
 * @returns 
 */
export default function TaskManagerFM() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTaskList();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddTask = async () => {
    try {
      const addTask = await addTaskToList(
        newTask.title,
        newTask.description,
        newTask.dueDate
      );
      setTasks(addTask);
      closeAddTaskModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      if (selectedTask) {
        const updatedTaskV = await updateTask(
          selectedTask.id,
          selectedTask.title,
          selectedTask.description,
          selectedTask.dueDate
        );
        
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTaskV.id ? updatedTaskV : task
          )
        );
        
        closeUpdateTaskModal();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      const updatedTaskList = await fetchTaskList();
      setTasks(updatedTaskList);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const openAddTaskModal = () => {
    setIsModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setIsModalOpen(false);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const openUpdateTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateTaskModal = () => {
    setIsUpdateModalOpen(false);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const handleUpdateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSelectedTask((prevSelectedTask) => ({
      ...prevSelectedTask!,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div className="task-list-container">
      <h1 className="list">Task Manger</h1>

      <button className="add-task-button" onClick={openAddTaskModal}>
        Add Task
      </button>

      {isModalOpen && (
        <div className="add-task-modal-container">
          <div className="add-task-modal">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              required
              value={newTask.title}
              onChange={handleInputChange}
            />

            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
            />

            <label>Due Date:</label>
            <input
              type="text"
              name="dueDate"
              required
              value={newTask.dueDate}
              onChange={handleInputChange}
            />

            <button className="add-task-button" onClick={handleAddTask}>
              Complete
            </button>
            <button className="close-modal-button" onClick={closeAddTaskModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <table className="task-table">
        <thead>
          <tr className="trs">
            <th className="ths">Title</th>
            <th className="ths">Description</th>
            <th className="ths">Due Date</th>
            <th className="ths">Delete</th>
            <th className="ths">Update</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(task.id)}
                >Delete</button>
              </td>
              <td>
                <button
                  className="update-button"
                  onClick={() => openUpdateTaskModal(task)}
                >
                  Update
                </button>
                {isUpdateModalOpen && (
                  <div className="add-task-modal-container">
                    <div className="add-task-modal">
                      <label>Title:</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={selectedTask?.title || ""}
                        onChange={handleUpdateInputChange}
                      />

                      <label>Description:</label>
                      <input
                        type="text"
                        name="description"
                        required
                        value={selectedTask?.description || ""}
                        onChange={handleUpdateInputChange}
                      />

                      <label>Due Date:</label>
                      <input
                        type="text"
                        name="dueDate"
                        required
                        value={selectedTask?.dueDate || ""}
                        onChange={handleUpdateInputChange}
                      />

                      <button
                        className="add-task-button"
                        onClick={handleUpdateTask}
                      >
                        Update
                      </button>
                      <button
                        className="close-modal-button"
                        onClick={closeUpdateTaskModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
