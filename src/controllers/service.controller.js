const ServiceService = require("../services/service.service");
const serviceService = new ServiceService();

class ServiceController {
  constructor() {}

  static async addService(req, res) {
    try {
      const newBooking = await serviceService.addService(req.body);
      return res.json(newBooking);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add booking" });
    }
  }

  static async getServices(req, res) {
    try {
      const bookings = await serviceService.getServices();
      return res.json(bookings);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch bookings" });
    }
  }

  static async getServiceById(req, res) {
    try {
      const { id } = req.params;
      const booking = await serviceService.getServiceById(id);
      if (!booking) {
        return res
          .status(404)
          .json({ error: true, message: "Booking not found" });
      }
      return res.json(booking);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch booking" });
    }
  }

  static async updateService(req, res) {
    try {
      const { id } = req.params;
      const updatedBooking = await serviceService.updateService(id, req.body);
      if (!updatedBooking) {
        return res
          .status(404)
          .json({ error: true, message: "Booking not found" });
      }
      return res.json(updatedBooking);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update booking" });
    }
  }

  static async deleteService(req, res) {
    try {
      const { id } = req.params;
      const deletedBooking = await serviceService.deleteService(id);
      if (!deletedBooking) {
        return res
          .status(404)
          .json({ error: true, message: "Booking not found" });
      }
      return res.json(deletedBooking);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete booking" });
    }
  }
}

module.exports = ServiceController;
