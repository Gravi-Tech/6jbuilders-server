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
}

module.exports = AssigneeService;
