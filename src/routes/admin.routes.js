const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const AdminController = require("../controllers/admin.controller");

router.post("/login", AdminController.login); 

router.get("/admins", Authorization.authorized, AdminController.getAdmins);
router.post("/admins", Authorization.authorized, AdminController.addAdmin);
router.get("/admins/:id", Authorization.authorized, AdminController.getAdminById);
router.put("/admins/:id", Authorization.authorized, AdminController.updateAdmin);

router.put("/admins/checkAccountNumber", Authorization.authorized, AdminController.checkAccountNumber);

module.exports = router;