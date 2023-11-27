const Assignee = require("../models/assignee.model");

class AssigneeService {
  constructor() {}

  async addAssigneeByTaskId(taskId, assigneeData) {
    try {
      const assignee = new Assignee({ task_id: taskId, assignees: [] });
      for (const assigneeObj of assigneeData.assignees) {
        const { worker_id } = assigneeObj;
        assignee.assignees.push({ worker_id });
      }
      const savedAssignee = await assignee.save();
      return { error: false, data: savedAssignee };
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyValue &&
        error.keyPattern &&
        error.keyPattern.task_id === 1
      ) {
        return { error: true, message: "The task already has an assignee" };
      }

      return {
        error: true,
        message: "Failed to add assignee by task ID",
        data: error,
      };
    }
  }

  async getAssigneesByTaskId(taskId) {
    try {
      const assignees = await Assignee.find({ task_id: taskId });
      return { error: false, data: assignees };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateAssigneesByTaskId(taskId, updatedAssigneeData) {
    try {
      const assignees = updatedAssigneeData.worker_id.map((workerId) => ({
        worker_id: workerId,
      }));

      const updatedAssignees = await Assignee.findOneAndUpdate(
        { task_id: taskId },
        { assignees },
        { new: true }
      );

      return { error: false, data: updatedAssignees };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteAssigneeById(assigneeId) {
    try {
      const deletedAssignee = await Assignee.updateMany(
        { "assignees._id": assigneeId },
        { $pull: { assignees: { _id: assigneeId } } },
        { multi: true }
      );

      if (deletedAssignee.nModified > 0) {
        return { error: false, message: "Assignee deleted successfully" };
      } else {
        return { error: true, message: "Assignee not found" };
      }
    } catch (error) {
      return {
        error: true,
        message: "Failed to delete assignee by ID",
        data: error,
      };
    }
  }

  async deleteTaskAssigneesById(taskId) {
    try {
      const deletedAssignees = await Assignee.deleteMany({ task_id: taskId });
      if (deletedAssignees.deletedCount > 0) {
        return { error: false, message: "Task assignees deleted successfully" };
      } else {
        return {
          error: false,
          message: "No task assignees found for the given task ID",
        };
      }
    } catch (error) {
      return {
        error: true,
        message: "Failed to delete task assignees by ID",
        data: error,
      };
    }
  }
}

module.exports = AssigneeService;
