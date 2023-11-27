
const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const UserController = require("../controllers/user.controller");

router.get("/users", Authorization.authorized, UserController.getUsers);
router.post("/users", Authorization.authorized, UserController.addUser);
router.get("/users/:id", Authorization.authorized, UserController.getUserById);
router.put("/users/:id", Authorization.authorized, UserController.updateUser);
router.delete("/users/:id", Authorization.authorized, UserController.deleteUser);

router.put("/users/profile", Authorization.authorized, UserController.updateUserProfile);
router.delete("/users/profile", Authorization.authorized, UserController.deleteUserProfile);

module.exports = router;