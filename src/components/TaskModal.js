import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const TaskModal = ({
  open,
  handleClose,
  currentTask,
  handleChange,
  handleSubmit,
  editMode,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          margin: "100px auto",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {editMode ? "Edit Task" : "Add Task"}
        </Typography>

        <Box mb={2}>
          <TextField
            label="Title"
            name="title"
            value={currentTask.title}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            name="description"
            value={currentTask.description}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Priority"
            name="priority"
            value={currentTask.priority}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={currentTask.status}
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
            value={currentTask.deadline.split("T")[0]}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Button variant="contained" onClick={handleSubmit}>
          {editMode ? "Update Task" : "Add Task"}
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
