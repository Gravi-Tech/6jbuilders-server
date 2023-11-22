const Service = require("../models/service.model");

class ServiceService {
  constructor() {}

  async addService(serviceData) {
    try {
      const serviceWithDefaultValues = {
        ...serviceData,
        createdDate: new Date(),
        updatedDate: new Date(),
      };
      const savedService = await Service.create(serviceWithDefaultValues);
      return { error: false, data: savedService };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getServices() {
    try {
      const serviceList = await Service.find({});
      return { error: false, data: serviceList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getServiceById(id) {
    try {
      const service = await Service.findById(id);
      return service
        ? { error: false, data: service }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateService(id, updatedServiceData) {
    try {
      const service = await Service.findById(id);
      if (!service) {
        return { error: true, data: "Service not found" };
      }

      const updatedService = await Service.findByIdAndUpdate(
        id,
        { ...updatedServiceData, updatedDate: new Date() },
        { new: true }
      );

      return updatedService
        ? { error: false, data: updatedService }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteService(id) {
    try {
      const deletedService = await Service.findByIdAndDelete(id);
      return deletedService
        ? { error: false, data: deletedService }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateServiceStatus(id, status) {
    try {
      const updatedService = await Service.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      return updatedService
        ? { error: false, data: updatedService }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getPublicServices() {
    try {
      const serviceList = await Service.find({
        $or: [{ title: { $ne: "All" } }, { status: "available" }],
      });
      return { error: false, data: serviceList };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = ServiceService;
