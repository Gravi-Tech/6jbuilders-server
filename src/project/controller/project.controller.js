const ProjectService = require("../../project/service/project.service");
const projectService = new ProjectService();

class ProjectController {
  constructor() {}

  static async addProject(req, res) {
    try {
      const newProject = await projectService.addProject(req.body);
      return res.json(newProject);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add project" });
    }
  }

  static async getProjects(req, res) {
    try {
      const projects = await projectService.getProjects();
      return res.json(projects);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch projects" });
    }
  }

  static async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);
      if (!project) {
        return res
          .status(404)
          .json({ error: true, message: "Project not found" });
      }
      return res.json(project);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch project" });
    }
  }

  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const updatedProject = await projectService.updateProject(id, req.body);
      if (!updatedProject) {
        return res
          .status(404)
          .json({ error: true, message: "Project not found" });
      }
      return res.json(updatedProject);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update project" });
    }
  }

  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const deletedProject = await projectService.deleteProject(id);
      if (!deletedProject) {
        return res
          .status(404)
          .json({ error: true, message: "Project not found" });
      }
      return res.json(deletedProject);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete project" });
    }
  }
}

module.exports = ProjectController;
