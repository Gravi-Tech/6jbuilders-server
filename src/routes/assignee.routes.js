const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const AssigneeController = require('../controllers/assignee.controller');

router.post("/tasks/:taskId/assignees", Authorization.authorized, AssigneeController.addAssigneeByTaskId);
router.get("/tasks/:taskId/assignees", Authorization.authorized, AssigneeController.getAssigneesByTaskId);
router.put("/tasks/:taskId/assignees", Authorization.authorized, AssigneeController.updateAssigneesByTaskId);
router.delete("/assignees/:assigneeId", Authorization.authorized, AssigneeController.deleteAssigneeById);
router.delete("/tasks/:taskId/assignees", Authorization.authorized, AssigneeController.deleteTaskAssigneesById);

module.exports = router;