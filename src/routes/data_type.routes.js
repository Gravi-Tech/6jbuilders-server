const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const DataTypeController = require("../controllers/data_type.controller");

router.get("/data_types", Authorization.authorized, DataTypeController.getTypes);
router.post("/data_types", Authorization.authorized, DataTypeController.addType);
router.get("/data_types/:id", Authorization.authorized, DataTypeController.getTypeById);
router.put("/data_types/:id", Authorization.authorized, DataTypeController.updateType);
router.delete("/data_types/:id", Authorization.authorized, DataTypeController.deleteType);

module.exports = router;