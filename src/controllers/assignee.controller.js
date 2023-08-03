const AssigneeService = require("../services/assignee.service");
const assigneeService = new AssigneeService();

class AssigneeController {
  constructor() {}

  static async addAssignee(req, res) {
    try {
      const newAssignee = await assigneeService.addAssignee(req.body);
      return res.json(newAssignee);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add assignee" });
    }
  }

  static async getAssignees(req, res) {
    try {
      const assignees = await assigneeService.getAssignees();
      return res.json(assignees);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch assignees" });
    }
  }

  static async getAssigneeById(req, res) {
    try {
      const { id } = req.params;
      const assignee = await assigneeService.getAssigneeById(id);
      if (!assignee) {
        return res
          .status(404)
          .json({ error: true, message: "Assignee not found" });
      }
      return res.json(assignee);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch assignee" });
    }
  }

  static async updateAssignee(req, res) {
    try {
      const { id } = req.params;
      const updatedAssignee = await assigneeService.updateAssignee(
        id,
        req.body
      );
      if (!updatedAssignee) {
        return res
          .status(404)
          .json({ error: true, message: "Assignee not found" });
      }
      return res.json(updatedAssignee);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update assignee" });
    }
  }

  static async deleteAssignee(req, res) {
    try {
      const { id } = req.params;
      const deletedAssignee = await assigneeService.deleteAssignee(id);
      if (!deletedAssignee) {
        return res
          .status(404)
          .json({ error: true, message: "Assignee not found" });
      }
      return res.json(deletedAssignee);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete assignee" });
    }
  }
}

module.exports = AssigneeController;
