const Project = require("../../project/model/project.model");

class ProjectService {
  constructor() {}

  async addProject(projectData) {
    try {
      const savedProject = await Project.create(projectData);
      return { error: false, data: savedProject };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getProjects() {
    try {
      const projectList = await Project.find({});
      return { error: false, data: projectList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getProjectById(id) {
    try {
      const project = await Project.findById(id);
      return project
        ? { error: false, data: project }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateProject(id, updatedProjectData) {
    try {
      const project = await Project.findById(id);
      if (!project) {
        return { error: true, data: "Project not found" };
      }

      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { ...updatedProjectData, updated_date: new Date() },
        { new: true }
      );

      return updatedProject
        ? { error: false, data: updatedProject }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteProject(id) {
    try {
      const deletedProject = await Project.findByIdAndDelete(id);
      return deletedProject
        ? { error: false, data: deletedProject }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ProjectService;
