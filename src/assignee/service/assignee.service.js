const Assignee = require("../../assignee/model/assignee.model");

class AssigneeService {
  constructor() {}

  async addAssignee(assigneeData) {
    try {
      const savedAssignee = await Assignee.create(assigneeData);
      return { error: false, data: savedAssignee };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getAssignees() {
    try {
      const assigneeList = await Assignee.find({});
      return { error: false, data: assigneeList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getAssigneeById(id) {
    try {
      const assignee = await Assignee.findById(id);
      return assignee
        ? { error: false, data: assignee }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateAssignee(id, updatedAssigneeData) {
    try {
      const assignee = await Assignee.findById(id);
      if (!assignee) {
        return { error: true, data: "Assignee not found" };
      }

      const updatedAssignee = await Assignee.findByIdAndUpdate(
        id,
        { ...updatedAssigneeData },
        { new: true }
      );

      return updatedAssignee
        ? { error: false, data: updatedAssignee }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteAssignee(id) {
    try {
      const deletedAssignee = await Assignee.findByIdAndDelete(id);
      return deletedAssignee
        ? { error: false, data: deletedAssignee }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = AssigneeService;
