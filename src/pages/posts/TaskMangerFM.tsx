import React, { useState, useEffect } from "react";
import {
    fetchTaskList,
    deleteTask,
    updateTask,
    addTaskToList,
} from "../api/Operations";

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
}

export default function TaskManagerFM() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({title: "", description: "", dueDate: "",});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleAddTask = async () => {
        try {
            const updatedTasks = await addTaskToList(
                newTask.title,
                newTask.description,
                newTask.dueDate
            );
            setTasks(updatedTasks);
            closeAddTaskModal();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleUpdateTask = async () => {
        try {
          // Implement the update logic here
          const updatedTasks = await updateTask(
            selectedTaskId!,
            newTask.title,
            newTask.description,
            newTask.dueDate
          );
          setTasks(updatedTasks);
          closeAddTaskModal();
        } catch (error) {
          console.error("Error updating task:", error);
        }
      };
    
      const openAddTaskModal = () => {
        setIsModalOpen(true);
      };
    
      const closeAddTaskModal = () => {
        setIsModalOpen(false);
        // Clear the form after closing the modal
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
        });
      };

    return (
        <div className="task-list-container">
            <h1 className="list">Task List</h1>

            {/* Add Task Button */}
            <button className="add-task-button" onClick={openAddTaskModal}>
                Add Task
            </button>

            {isModalOpen && (
                <div className="add-task-modal-container">
                    {/* Add Task Modal */}
                    <div className="add-task-modal">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
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
                            value={newTask.dueDate}
                            onChange={handleInputChange}
                        />

                        <button className="add-task-button" onClick={handleAddTask}>
                            Add Task
                        </button>

                        <button className="close-modal-button" onClick={closeAddTaskModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Task List Table */}
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Delete</th>
                        <th>Update</th>
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
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button
                                    className="update-button"
                                    onClick={() =>
                                        updateTask(
                                            task.id,
                                            task.description,
                                            task.dueDate,
                                            task.title
                                        )
                                    }
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
