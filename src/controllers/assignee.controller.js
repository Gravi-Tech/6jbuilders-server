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

  // DO NOT USE
  static async deleteAssigneeById(req, res) {
    try {
      const { assigneeId } = req.params;

      const { taskId } = req.body;
  
      const assigneesResponse = await assigneeService.getAssigneesByTaskId(taskId);
      if (assigneesResponse.error) {
        console.error(assigneesResponse.data);
        return res.status(500).json({
          error: true,
          message: "Failed to retrieve assignees",
        });
      }
      const assignees = assigneesResponse.data;
  
      const updatedAssignees = assignees.map((assignee) => {
        assignee.assignees = assignee.assignees.filter(
          (assignee) => assignee.worker_id !== assigneeId
        );
        return assignee;
      });
  
      const updateResult = await assigneeService.updateAssigneesByTaskId(
        taskId,
        updatedAssignees
      );
  
      if (updateResult.error) {
        console.error(updateResult.data);
        return res.status(500).json({
          error: true,
          message: "Failed to delete assignee",
        });
      }
  
      return res.json({
        success: true,
        message: "Assignee deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Failed to delete assignee",
      });
    }
  }

  static async deleteTaskAssigneesById(req, res) {
    try {
      const { taskId } = req.params;

      const assignees = await assigneeService.getAssigneesByTaskId(taskId);
      if (assignees.error) {
        console.error(assignees.data);
        return res.status(500).json({
          error: true,
          message: "Failed to retrieve assignees for the task",
        });
      }

      if (assignees.data.length > 0) {
        await assigneeService.deleteTaskAssigneesById(taskId);
      }

      return res.json({
        success: true,
        message: "Task assignees deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Failed to delete task assignees by ID",
      });
    }
  }
}

module.exports = AssigneeController;
