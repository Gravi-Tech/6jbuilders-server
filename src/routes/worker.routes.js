const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const WorkerController = require("../controllers/worker.controller");

router.get("/workers", Authorization.authorized, WorkerController.getWorker);
router.post("/workers", Authorization.authorized,WorkerController.addWorker);
router.get("/workers/:id", Authorization.authorized, WorkerController.getWorkerById);
router.put("/workers/:id", Authorization.authorized, WorkerController.updateWorker);
router.delete("/workers/:id", Authorization.authorized, WorkerController.deleteWorker);

module.exports = router;