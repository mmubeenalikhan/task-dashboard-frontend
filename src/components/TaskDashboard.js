import React, { useState, useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import BulkTaskUpload from "./BulkTaskUpload";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    deadline: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const taskData = await getTasks();
    setTasks(taskData);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentTask({
      title: "",
      description: "",
      priority: "",
      status: "",
      deadline: "",
    });
  };

  const handleBulkOpen = () => setBulkOpen(true);
  const handleBulkClose = () => setBulkOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const handleSubmit = async () => {
    if (editMode) {
      await updateTask(currentTask.id, currentTask);
    } else {
      await createTask(currentTask);
    }
    fetchTasks();
    handleClose();
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setEditMode(true);
    handleOpen();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Task Management Dashboard
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setEditMode(false);
          handleOpen();
        }}
      >
        Add Task
      </Button>
      <Button
        variant="contained"
        onClick={handleBulkOpen}
        sx={{ marginLeft: 2 }}
      >
        Add Multiple Tasks
      </Button>

      <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />

      <TaskModal
        open={open}
        handleClose={handleClose}
        currentTask={currentTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editMode={editMode}
      />

      <BulkTaskUpload
        open={bulkOpen}
        handleClose={handleBulkClose}
        fetchTasks={fetchTasks}
      />
    </Container>
  );
};

export default TaskDashboard;
