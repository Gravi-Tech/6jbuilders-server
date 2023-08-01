const BookingService = require("../../service/service/service.service");
const bookingService = new BookingService();

class BookingController {
  constructor() {}

  static async addBooking(req, res) {
    try {
      const newBooking = await bookingService.addBooking(req.body);
      return res.json(newBooking);
    } catch (error) {
      return res.status(500).json({ error: true, message: "Failed to add booking" });
    }
  }

  static async getBookings(req, res) {
    try {
      const bookings = await bookingService.getBookings();
      return res.json(bookings);
    } catch (error) {
      return res.status(500).json({ error: true, message: "Failed to fetch bookings" });
    }
  }

  static async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await bookingService.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ error: true, message: "Booking not found" });
      }
      return res.json(booking);
    } catch (error) {
      return res.status(500).json({ error: true, message: "Failed to fetch booking" });
    }
  }

  static async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const updatedBooking = await bookingService.updateBooking(id, req.body);
      if (!updatedBooking) {
        return res.status(404).json({ error: true, message: "Booking not found" });
      }
      return res.json(updatedBooking);
    } catch (error) {
      return res.status(500).json({ error: true, message: "Failed to update booking" });
    }
  }

  static async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      const deletedBooking = await bookingService.deleteBooking(id);
      if (!deletedBooking) {
        return res.status(404).json({ error: true, message: "Booking not found" });
      }
      return res.json(deletedBooking);
    } catch (error) {
      return res.status(500).json({ error: true, message: "Failed to delete booking" });
    }
  }
}

module.exports = BookingController;