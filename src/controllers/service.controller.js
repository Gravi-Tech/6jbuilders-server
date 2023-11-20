const ServiceService = require("../services/service.service");
const serviceService = new ServiceService();

class ServiceController {
  static async addService(req, res) {
    try {
      const newService = await serviceService.addService(req.body);
      return res.json(newService);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add service" });
    }
  }

  static async getServices(req, res) {
    try {
      const services = await serviceService.getServices();
      return res.json(services);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch services" });
    }
  }

  static async getServiceById(req, res) {
    try {
      const { id: serviceId } = req.params;
      const service = await serviceService.getServiceById(serviceId);
      if (!service) {
        return res
          .status(404)
          .json({ error: true, message: "Service not found" });
      }
      return res.json(service);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch service" });
    }
  }

  static async updateService(req, res) {
    try {
      const { id: serviceId } = req.params;
      const updatedService = await serviceService.updateService(
        serviceId,
        req.body
      );
      if (!updatedService) {
        return res
          .status(404)
          .json({ error: true, message: "Service not found" });
      }
      return res.json(updatedService);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update service" });
    }
  }

  static async deleteService(req, res) {
    try {
      const { id: serviceId } = req.params;
      const deletedService = await serviceService.deleteService(serviceId);
      if (!deletedService) {
        return res
          .status(404)
          .json({ error: true, message: "Service not found" });
      }
      return res.json(deletedService);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete service" });
    }
  }
}

module.exports = ServiceController;
