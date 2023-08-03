const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const AssigneeController = require('../controllers/assignee.controller');
const { adminPermissions } = require('../middlewares/permissions');

router.get("/assignees", Authorization.authorized, adminPermissions, AssigneeController.getAssignees);
router.post("/assignees", Authorization.authorized, adminPermissions, AssigneeController.addAssignee);
router.get("/assignees/:id", Authorization.authorized, adminPermissions, AssigneeController.getAssigneeById);
router.put("/assignees/:id", Authorization.authorized, adminPermissions, AssigneeController.updateAssignee);
router.delete("/assignees/:id", Authorization.authorized, adminPermissions, AssigneeController.deleteAssignee);

module.exports = router;
