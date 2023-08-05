const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const ServiceController = require("../controllers/service.controller");
const { adminPermissions} = require("../middlewares/permissions");

router.get("/services", Authorization.authorized, ServiceController.getServices);
router.post("/services", Authorization.authorized, adminPermissions, ServiceController.addService);
router.get("/services/:id", Authorization.authorized, ServiceController.getServiceById);
router.put("/services/:id", Authorization.authorized, adminPermissions, ServiceController.updateService);
router.delete("/services/:id", Authorization.authorized, adminPermissions, ServiceController.deleteService);

module.exports = router;