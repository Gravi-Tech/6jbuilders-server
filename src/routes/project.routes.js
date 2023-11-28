const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const ProjectController = require('../controllers/project.controller');
const { uploadSingleImage, uploadMultipleImages } = require("../middlewares/upload");

router.post("/projects", Authorization.authorized, uploadSingleImage, uploadMultipleImages, ProjectController.addProject);

module.exports = router;