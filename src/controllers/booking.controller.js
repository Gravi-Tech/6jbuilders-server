const BookingService = require("../services/booking.service");
const bookingService = new BookingService();

class BookingController {
  static async createBooking(req, res) {
    try {
      const {
        type,
        service,
        first_name,
        middle_name,
        last_name,
        mobile_number,
        email,
        location,
        schedule_date,
        note,
      } = req.body;

      const newBookingData = {
        type,
        service,
        first_name,
        middle_name,
        last_name,
        mobile_number,
        email,
        location,
        date_created: new Date(),
        schedule_date,
        note,
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

  static async rejectBooking(req, res) {
    try {
      const { id: bookingId } = req.params;
      const booking = await bookingService.getBookingById(bookingId);
      if (!booking) {
        return res
          .status(404)
          .json({ error: true,status: 404, message: "Booking not found" });
      }

      if (booking.data.status === "Rejected") {
        return res
          .status(400)
          .json({ error: true, message: "Booking is already rejected." });
      }

      const updatedBookingData = {
        status: "Rejected",
        isRejected: true,
        date_rejected: new Date(),
      };

      const updatedBooking = await bookingService.updateBooking(
        bookingId,
        updatedBookingData
      );
      return res.json(updatedBooking);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to reject booking" });
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
      return res.json({ message: "Booking deleted successfully", data: null });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete booking" });
    }
  }

  static async checkBookingStatus(req, res) {
    try {
      const { id: bookingId } = req.params;
      const booking = await bookingService.getBookingById(bookingId);
      if (!booking || booking.error) {
        return res.status(404).json({ error: true, message: "Task not found" });
      }
      const status = booking.data.status;
      return res.json({ error: false, data: status });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch booking status" });
    }
  }
}

module.exports = BookingController;
