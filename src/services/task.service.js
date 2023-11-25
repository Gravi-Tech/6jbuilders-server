const Task = require("../models/task.model");

class TaskService {
  async addTask(taskData) {
    try {
      const taskWithDefaultValues = {
        ...taskData,
        created_date: new Date(),
        updated_date: new Date(),
      };
      const savedTask = await Task.create(taskWithDefaultValues);
      return { error: false, data: savedTask };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getTasks() {
    try {
      const tasksList = await Task.find({});
      return { error: false, data: tasksList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getTaskById(id) {
    try {
      const task = await Task.findById(id);
      return task ? { error: false, data: task } : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateTask(id, updatedTaskData) {
    try {
      const task = await Task.findById(id);
      if (!task) {
        return { error: true, data: "Task not found" };
      }

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { ...updatedTaskData, date_updated: new Date() },
        { new: true }
      );

      return updatedTask
        ? { error: false, data: updatedTask }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateTaskIsVisited(id, isVisited) {
    try {
      const task = await Task.findById(id);
      if (!task) {
        return { error: true, data: "Task not found" };
      }

      task.isVisited = isVisited;
      task.date_started = isVisited ? new Date() : null;
      task.date_updated = new Date();

      const updatedTask = await task.save();

      return updatedTask
        ? { error: false, data: updatedTask }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteTask(id) {
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      return { error: false, data: deletedTask || null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async checkTaskStatus(taskId) {
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return { error: true, message: "Task not found" };
      }
      const status = task.status;
      return { error: false, data: status };
    } catch (error) {
      return { error: true, message: "Failed to fetch task status" };
    }
  }

  async cancelTask(taskId, reasonId, otherReason) {
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return { error: true, message: "Task not found" };
      }

      if (task.data.status === "Cancelled") {
        return { error: true, message: "Task is already cancelled" };
      }

      task.data.status = "Cancelled";
      task.data.isCancelled = true;
      task.data.reasonId = reasonId;
      task.data.date_cancelled = new Date();
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        {
          "data.status": "Cancelled",
          "data.isCancelled": true, 
          "data.reasonId": reasonId,
          "data.otherReason": otherReason, 
        },
        { new: true }
      );

      if (!updatedTask) {
        return { error: true, message: "Failed to cancel task" };
      }

      return { error: false, data: updatedTask };
    } catch (error) {
      return { error: true, message: "Failed to cancel task" };
    }
  }

  async completeTask(taskId, totalAmount) {
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return { error: true, message: "Task not found" };
      }
      if (task.status === "Completed") {
        return { error: true, message: "Task is already completed" };
      }
      task.status = "Completed";
      task.date_completed = new Date();
      task.date_updated = new Date();
      task.isCompleted = true;
      task.total_amount = parseFloat(totalAmount);
      const updatedTask = await task.save();

      if (!updatedTask) {
        return { error: true, message: "Failed to complete task" };
      }
      return { error: false, data: updatedTask };
    } catch (error) {
      return { error: true, message: "Failed to complete task" };
    }
  }
}

module.exports = TaskService;
