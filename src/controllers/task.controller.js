const TaskService = require("../services/task.service");
const taskService = new TaskService();

class TaskController {
  static async addTask(req, res) {
    try {
      const newTask = await taskService.addTask(req.body);
      return res.json(newTask);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add task" });
    }
  }

  static async getTasks(req, res) {
    try {
      const tasks = await taskService.getTasks();
      return res.json(tasks);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch tasks" });
    }
  }

  static async getTaskById(req, res) {
    try {
      const { id: taskId } = req.params;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      return res.json(task);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch task" });
    }
  }

  static async updateTask(req, res) {
    try {
      const { id: taskId } = req.params;
      const updatedTask = await taskService.updateTask(taskId, req.body);
      if (!updatedTask) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      return res.json(updatedTask);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update task" });
    }
  }

  static async updateTaskIsVisited(req, res) {
    try {
      const { id: taskId } = req.params;
      const { isVisited } = req.body;
      const updatedTask = await taskService.updateTaskIsVisited(
        taskId,
        isVisited
      );
      if (!updatedTask) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      return res.json(updatedTask);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update task" });
    }
  }

  static async deleteTask(req, res) {
    try {
      const { id: taskId } = req.params;
      const deletionResult = await taskService.deleteTask(taskId);

      if (!deletionResult.data) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }

      return res.json({ message: "Successfully deleted task", data: null });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete task" });
    }
  }

  static async checkTaskStatus(req, res) {
    try {
      const { id: taskId } = req.params;
      const task = await taskService.getTaskById(taskId);
      if (!task || task.error) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      const status = task.data.status;
      return res.json({ error: false, data: status });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch task status" });
    }
  }

  static async cancelTask(req, res) {
    try {
      const { id: taskId } = req.params;
      const { reasonId, otherReason } = req.body;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      if (task.data.status === "Cancelled") {
        return res
          .status(400)
          .json({ error: true, message: "Task is already cancelled" });
      }

      const updatedTaskData = {
        status: "Cancelled",
        isCancelled: true,
        reasonId: reasonId,
        otherReason: otherReason,
        date_cancelled: new Date(),
        date_started: null,
      };

      const updatedTask = await taskService.updateTask(taskId, updatedTaskData);
      return res.json(updatedTask);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to cancel task" });
    }
  }

  static async completeTask(req, res) {
    try {
      const { id: taskId } = req.params;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      if (task.data.status === "Completed") {
        return res
          .status(400)
          .json({ error: true, message: "Task is already completed" });
      }
      task.data.status = "Completed";
      task.data.isCompleted = true;
      task.data.date_completed = new Date();
      task.data.total_amount = parseFloat(req.body.total_amount);
      const updatedTaskData = task.data;
      const updatedTask = await taskService.updateTask(taskId, updatedTaskData);
      return res.json(updatedTask);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to complete task" });
    }
  }
}

module.exports = TaskController;
