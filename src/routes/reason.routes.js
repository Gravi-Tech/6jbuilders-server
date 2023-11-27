const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const ReasonController = require("../controllers/reason.controller");

router.get("/reasons", Authorization.authorized, ReasonController.getReasons);
router.post("/reasons", Authorization.authorized, ReasonController.addReason);
router.get("/reasons/:id", Authorization.authorized, ReasonController.getReasonById);
router.put("/reasons/:id", Authorization.authorized, ReasonController.updateRason);
router.delete("/reasons/:id", Authorization.authorized, ReasonController.deleteReason);

module.exports = router;