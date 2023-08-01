const express = require("express");
const router = express.Router();
const Authorization = require('../../middlewares/authorization');
const ProjectController = require('../../project/controller/project.controller');

router.get("/projects", Authorization.authorized, ProjectController.getProjects);
router.post("/projects", Authorization.authorized, ProjectController.addProject);
router.get("/projects/:id", Authorization.authorized, ProjectController.getProjectById);
router.put("/projects/:id", Authorization.authorized, ProjectController.updateProject);
router.delete("/projects/:id", Authorization.authorized, ProjectController.deleteProject);

module.exports = router;
