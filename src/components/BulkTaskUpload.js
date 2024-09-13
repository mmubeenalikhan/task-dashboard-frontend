import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { bulkCreateTasks } from "../services/taskService";

const BulkTaskUpload = ({ open, handleClose, fetchTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    deadline: "",
  });
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleAddTask = () => {
    setTasks([...tasks, task]);
    setTask({
      title: "",
      description: "",
      priority: "",
      status: "",
      deadline: "",
    });
  };

  const handleSubmit = async () => {
    await bulkCreateTasks(tasks);
    setTasks([]);

    handleClose();
    fetchTasks();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 800,
          maxHeight: "80vh",
          margin: "100px auto",
          padding: "20px",
          backgroundColor: "white",
          overflow: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Multiple Tasks
        </Typography>

        <Box mb={2}>
          <TextField
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={task.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <TextField
            label="Deadline"
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>

        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setTasks(tasks.filter((_, i) => i !== index));
                      }}
                      color="error"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ marginTop: "20px" }}
        >
          Submit Tasks
        </Button>
      </Box>
    </Modal>
  );
};

export default BulkTaskUpload;
