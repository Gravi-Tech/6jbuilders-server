const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const PositionController = require("../controllers/position.controller");

router.get("/positions", Authorization.authorized, PositionController.getPosition);
router.post("/positions", Authorization.authorized, PositionController.addPosition);
router.get("/positions/:id", Authorization.authorized, PositionController.getPositionById);
router.put("/positions/:id", Authorization.authorized, PositionController.updatePosition);
router.delete("/positions/:id", Authorization.authorized, PositionController.deletePosition);

module.exports = router;