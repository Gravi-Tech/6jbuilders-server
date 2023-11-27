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

  static async getPublicServices(req, res) {
    try {
      const services = await serviceService.getPublicServices();
      return res.json(services);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch public services" });
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

  static async updateServiceStatus(req, res) {
    try {
      const { id: serviceId } = req.params;
      const { status } = req.body;
      const updatedService = await serviceService.updateServiceStatus(
        serviceId,
        status
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
        .json({ error: true, message: "Failed to update service status" });
    }
  }

  static async deleteService(req, res) {
    try {
      const { id: serviceId } = req.params;
      const deletionResult = await serviceService.deleteService(serviceId);

      if (!deletionResult.data) {
        return res
          .status(404)
          .json({ error: true, message: "Service not found" });
      }

      return res.json({ message: "Successfully deleted service", data: null });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete service" });
    }
  }
}

module.exports = ServiceController;
