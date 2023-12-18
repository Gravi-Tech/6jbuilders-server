const ProjectService = require("../services/project.service");
const Task = require("../models/task.model");
const mongoose = require("mongoose");

const projectService = new ProjectService();

class ProjectController {
  constructor() {}

  static async addProject(req, res) {
    try {
      const { taskId, title, description } = req.body;

      console.log("Request Body:", req.body);

      const task = await Task.findById(taskId);
      if (!task) {
        console.log("Task not found");
        return res.status(404).json({ error: true, message: "Task not found" });
      }

      const { location, date_completed, service } = task;

      const bg_img = req.file ? req.file.filename : null;
      const project_imgs = req.files
        ? req.files.map((file) => file.filename)
        : [];

      const newProject = await projectService.addProject({
        taskId,
        title,
        bg_img,
        project_imgs,
        description,
        location,
        date_completed,
        service,
      });

      console.log("New Project:", newProject);

      return res.json(newProject);
    } catch (error) {
      console.error("Failed to add project:", error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to add project" });
    }
  }
}

module.exports = ProjectController;
