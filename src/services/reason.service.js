const Reason = require("../models/reason.model");

class ReasonService {
  constructor() {}

  async addReason(reasonData) {
    try {
      const reasonWithDefaultValues = {
        ...reasonData,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const savedReason = await Reason.create(reasonWithDefaultValues);
      return { error: false, data: savedReason };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getReasons() {
    try {
      const reasonList = await Reason.find({});
      return { error: false, data: reasonList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getReasonById(id) {
    try {
      const reason = await Reason.findById(id);
      return reason
        ? { error: false, data: reason }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateReason(id, updatedReasonData) {
    try {
      const service = await Reason.findById(id);
      if (!service) {
        return { error: true, data: "Service not found" };
      }

      const updatedReason = await Reason.findByIdAndUpdate(
        id,
        { ...updatedReasonData, date_updated: new Date() },
        { new: true }
      );

      return updatedReason
        ? { error: false, data: updatedReason }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteReason(id) {
    try {
      const deletedService = await Reason.findByIdAndDelete(id);
      return deletedService
        ? { error: false, data: null }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: null };
    }
  }

}

module.exports = ReasonService;
