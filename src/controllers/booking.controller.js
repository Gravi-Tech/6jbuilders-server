const BookingService = require("../services/booking.service");
const bookingService = new BookingService();
const emailService = require("../services/email.service");

class BookingController {
  constructor() {}

  static async createBooking(req, res) {
    try {
      const { service_id, site_location, book_date, due_date, assignee_ids } =
        req.body;

      const newBookingData = {
        service_id,
        user_id: req.user._id,
        site_location,
        book_date,
        due_date,
        assignee_ids,
        is_verified: false,
      };

      const newBooking = await bookingService.createBooking(newBookingData);

      const { name, email } = req.user;

      await emailService.sendVerificationEmail(name, email, newBooking._id);

      return res.json(newBooking);
    } catch (error) {
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
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch booking" });
    }
  }

  static async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const updatedBookingData = req.body;

      if (req.user.role === "Admin" && "is_verified" in updatedBookingData) {
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
      } else {
        delete updatedBookingData.is_verified;
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
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update booking" });
    }
  }

  static async deleteBooking(req, res) {
    try {
      const { id } = req.params;

      if (req.user.role === "Admin") {
        const deletedBooking = await bookingService.deleteBooking(id);
        if (!deletedBooking) {
          return res
            .status(404)
            .json({ error: true, message: "Booking not found" });
        }
        return res.json(deletedBooking);
      } else {
        return res
          .status(403)
          .json({ error: true, message: "Permission denied" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete booking" });
    }
  }
}

module.exports = BookingController;
