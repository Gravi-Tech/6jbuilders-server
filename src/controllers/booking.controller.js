const BookingService = require("../services/booking.service");
const bookingService = new BookingService();

class BookingController {
  static async createBooking(req, res) {
    try {
      const {
        service,
        email,
        fullName,
        mobileNumber,
        location,
        scheduleDate,
        selectedTimeRange,
        type,
        note
      } = req.body;

      const newBookingData = {
        type,
        service,
        fullName,
        mobileNumber,
        email,
        location,
        createdDate: new Date(),
        scheduleDate,
        selectedTimeRange,
        note
      };

      const newBooking = await bookingService.createBooking(newBookingData);

      return res.json(newBooking);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to create booking" });
    }
  }

  static async getBookings(req, res) {
    try {
      const bookings = await bookingService.getBookings();
      return res.json(bookings);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch bookings" });
    }
  }

  static async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await bookingService.getBookingById(id);
      if (!booking) {
        return res
          .status(404)
          .json({ error: true, message: "Booking not found" });
      }
      return res.json(booking);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch booking" });
    }
  }

  static async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const updatedBookingData = req.body;

      const updatedBooking = await bookingService.updateBooking(
        id,
        updatedBookingData
      );
      if (!updatedBooking) {
        return res
          .status(404)
          .json({ error: true, message: "Booking not found" });
      }
      return res.json(updatedBooking);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to update booking" });
    }
  }

  static async deleteBooking(req, res) {
    try {
      const { id } = req.params;

      const deletedBooking = await bookingService.deleteBooking(id);
      if (!deletedBooking) {
        return res
          .status(404)
          .json({ error: true, message: "Booking not found" });
      }
      return res.json({ message: "Booking deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete booking" });
    }
  }
}

module.exports = BookingController;
