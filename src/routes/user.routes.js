/** user.routes.js */
const express = require("express");
const router = express.Router();

const Authorization = require('../middlewares/authorization.js');
const UserController = require('../controllers/user.control')

router.get("/users", /* Authorization.authorized, */ UserController.GetUsers)
router.post("/users", /* Authorization.authorized, */ UserController.AddUser)

module.exports = router;