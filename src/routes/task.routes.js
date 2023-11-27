const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const TaskController = require("../controllers/task.controller");

router.get("/tasks", Authorization.authorized, TaskController.getTasks);
router.post("/tasks", Authorization.authorized, TaskController.addTask);
router.get("/tasks/:id", Authorization.authorized, TaskController.getTaskById);
router.put("/tasks/:id", Authorization.authorized, TaskController.updateTask);
router.put("/tasks/:id/visited", Authorization.authorized, TaskController.updateTaskIsVisited);
router.delete("/tasks/:id", Authorization.authorized, TaskController.deleteTask);
router.get("/tasks/:id/status", Authorization.authorized, TaskController.checkTaskStatus);
router.put("/tasks/:id/cancel", Authorization.authorized, TaskController.cancelTask);
router.put("/tasks/:id/complete", Authorization.authorized, TaskController.completeTask);

module.exports = router;
