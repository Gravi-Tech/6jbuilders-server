const AssigneeService = require("../services/assignee.service");
const assigneeService = new AssigneeService();

class AssigneeController {
  constructor() {}

  static async addAssigneeByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const newAssignee = await assigneeService.addAssigneeByTaskId(
        taskId,
        req.body
      );
      return res.json(newAssignee);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add assignee by task ID" });
    }
  }

  static async getAssigneesByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const assignees = await assigneeService.getAssigneesByTaskId(taskId);

      if (assignees.length > 0 && assignees[0].assignees.length > 0) {
        const workerIds = assignees[0].assignees.map(
          (assignee) => assignee.worker_id
        );
        return res.json({ assignees, workerIds });
      } else {
        return res.json({ assignees, workerIds: [] });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch assignees by task ID" });
    }
  }

  static async updateAssigneesByTaskId(req, res) {
    try {
      const { taskId } = req.params;
      const updatedAssignees = await assigneeService.updateAssigneesByTaskId(
        taskId,
        req.body
      );
      return res.json(updatedAssignees);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Failed to update assignees by task ID",
      });
    }
  }
}

module.exports = AssigneeController;
