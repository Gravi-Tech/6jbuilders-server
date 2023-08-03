const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const UserController = require('../controllers/admin.controller');
const { adminPermissions } = require('../middlewares/permissions');

router.get("/users", Authorization.authorized, adminPermissions, UserController.getUsers);
router.post("/users", Authorization.authorized, adminPermissions, UserController.addUser);
router.get("/users/:id", Authorization.authorized, adminPermissions, UserController.getUserById);
router.put("/users/:id", Authorization.authorized, adminPermissions, UserController.updateUser);
router.delete("/users/:id", Authorization.authorized, adminPermissions, UserController.deleteUser);

router.put("/users/profile", Authorization.authorized, UserController.updateUserProfile);
router.delete("/users/profile", Authorization.authorized, UserController.deleteUserProfile);

module.exports = router;
