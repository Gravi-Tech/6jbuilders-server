
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/users/login", UserController.login); 

router.get("/users", UserController.getUsers);
router.post("/users", UserController.addUser);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

router.put("/users/profile", UserController.updateUserProfile);
router.delete("/users/profile", UserController.deleteUserProfile);

module.exports = router;