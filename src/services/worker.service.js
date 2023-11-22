const Worker = require("../models/worker.model");

class WorkerService {
  constructor() {}

  async addWorker(workerData) {
    try {
      const workerWithDefaultValues = {
        ...workerData,
        createdDate: new Date(),
        updatedDate: new Date(),
      };
      const savedWorker = await Worker.create(workerWithDefaultValues);
      return { error: false, data: savedWorker };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getWorker() {
    try {
      const workerList = await Worker.find({});
      return { error: false, data: workerList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getWorkerById(id) {
    try {
      const worker = await Worker.findById(id);
      return worker
        ? { error: false, data: worker}
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateWorker(id, updatedWorkerData) {
    try {
      const worker = await Worker.findById(id);
      if (!worker) {
        return { error: true, data: "Worker not found" };
      }

      const updatedWorker = await Worker.findByIdAndUpdate(
        id,
        { ...updatedWorkerData, updated_date: new Date() },
        { new: true }
      );

      return updatedWorker
        ? { error: false, data: updatedWorker }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteWorker(id) {
    try {
      const deletedWorker = await Worker.findByIdAndDelete(id);
      return deletedWorker
        ? { error: false, data: deletedWorker }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
  async getPublicWorker() {
    try {
      const workerList = await Worker.find({
        $or: [{ title: { $ne: "All" } }, { status: "available" }],
      });
      return { error: false, data: workerList };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = WorkerService;
