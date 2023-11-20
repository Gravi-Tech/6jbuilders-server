const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const AssigneeController = require('../controllers/assignee.controller');

router.get("/assignees", Authorization.authorized, AssigneeController.getAssignees);
router.post("/assignees", Authorization.authorized, AssigneeController.addAssignee);
router.get("/assignees/:id", Authorization.authorized, AssigneeController.getAssigneeById);
router.put("/assignees/:id", Authorization.authorized, AssigneeController.updateAssignee);
router.delete("/assignees/:id", Authorization.authorized, AssigneeController.deleteAssignee);

module.exports = router;
