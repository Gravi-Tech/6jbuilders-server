const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const ServiceController = require("../controllers/service.controller");

router.get("/public/services", ServiceController.getPublicServices);

router.get("/services", Authorization.authorized, ServiceController.getServices);
router.post("/services", Authorization.authorized, ServiceController.addService);
router.get("/services/:id", Authorization.authorized, ServiceController.getServiceById);
router.put("/services/:id", Authorization.authorized, ServiceController.updateService);
router.put("/services/:id/status", Authorization.authorized, ServiceController.updateServiceStatus);
router.delete("/services/:id", Authorization.authorized, ServiceController.deleteService);

module.exports = router;