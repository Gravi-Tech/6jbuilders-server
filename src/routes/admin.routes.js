const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const AdminController = require('../controllers/admin.controller');
const { adminPermissions } = require('../middlewares/permissions');

router.get("/admins", Authorization.authorized, adminPermissions, AdminController.getAdmins);
router.post("/admins", Authorization.authorized, adminPermissions, AdminController.addAdmin);
router.get("/admins/:id", Authorization.authorized, adminPermissions, AdminController.getAdminById);
router.put("/admins/:id", Authorization.authorized, adminPermissions, AdminController.updateAdmin);
router.delete("/admins/:id", Authorization.authorized, adminPermissions, AdminController.deleteAdmin);

module.exports = router;
