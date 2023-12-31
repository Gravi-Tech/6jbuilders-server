const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const ProjectController = require('../controllers/project.controller');

router.post("/projects", Authorization.authorized, ProjectController.addProject);

module.exports = router;