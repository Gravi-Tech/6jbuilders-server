const WorkerService = require("../services/worker.service");
const workerService = new WorkerService();

class WorkerController {
  static async addWorker(req, res) {
    try {
      const newWorker = await workerService.addWorker(req.body);
      return res.json(newWorker);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add worker" });
    }
  }

  static async getWorker(req, res) {
    try {
      const worker = await workerService.getWorker();
      return res.json(worker);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch worker" });
    }
  }
  static async getWorkerById(req, res) {
    try {
      const { id: workerId } = req.params;
      const worker = await workerService.getWorkerById(workerId);
      if (!worker) {
        return res
          .status(404)
          .json({ error: true, message: "Service not found" });
      }
      return res.json(worker);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch workers" });
    }
  }

  static async updateWorker(req, res) {
    try {
      const { id: workerId } = req.params;
      const updatedWorker = await workerService.updateWorker(
        workerId,
        req.body
      );
      if (!updatedWorker) {
        return res
          .status(404)
          .json({ error: true, message: "Worker not found" });
      }
      return res.json(updatedWorker);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update workers" });
    }
  }
  static async deleteWorker(req, res) {
    try {
      const { id: workerId } = req.params;
      const deletedWorker = await workerService.deleteWorker(workerId);
      if (!deletedWorker) {
        return res
          .status(404)
          .json({ error: true, message: "Worker not found" });
      }
      return res.json(deletedWorker);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete worker" });
    }
  }
}

module.exports = WorkerController;
