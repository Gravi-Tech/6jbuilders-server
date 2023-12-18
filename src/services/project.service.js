const Project = require("../models/project.model");

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
}

module.exports = ProjectService;
