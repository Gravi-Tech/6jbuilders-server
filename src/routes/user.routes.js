
const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const UserController = require("../controllers/user.controller");
const { adminPermissions, clientPermissions } = require("../middlewares/permissions");

router.get("/users", Authorization.authorized, adminPermissions, UserController.getUsers);
router.post("/users", Authorization.authorized, UserController.addUser);
router.get("/users/:id", Authorization.authorized, adminPermissions, UserController.getUserById);
router.put("/users/:id", Authorization.authorized, adminPermissions, UserController.updateUser);
router.delete("/users/:id", Authorization.authorized, adminPermissions, UserController.deleteUser);

router.put("/users/profile", Authorization.authorized, clientPermissions, UserController.updateUserProfile);
router.delete("/users/profile", Authorization.authorized, clientPermissions, UserController.deleteUserProfile);

module.exports = router;