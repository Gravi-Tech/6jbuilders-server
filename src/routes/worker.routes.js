const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const ServiceController = require("../controllers/worker.controller");
const WorkerController = require("../controllers/worker.controller");

router.get("/public/worker", ServiceController.getPublicServices);

router.get("/worker", Authorization.authorized, WorkerController.getWorker);
router.post("/worker", Authorization.authorized,WorkerController.addWorker);
router.get("/worker/:id", Authorization.authorized, WorkerController.getWorkerById);
router.put("/worker/:id", Authorization.authorized, WorkerController.updateWorker);
router.put("/worker/:id/status", Authorization.authorized, WorkerController.updateWorkerStatus);
router.delete("/worker/:id", Authorization.authorized, WorkerController.deleteWorker);

module.exports = router;