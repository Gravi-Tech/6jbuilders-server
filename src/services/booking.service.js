const Booking = require("../models/booking.model");

class BookingService {
  async createBooking(bookingData) {
    try {
      const savedBooking = await Booking.create(bookingData);
      return { error: false, data: savedBooking };
    } catch (error) {
      console.error(error);
      return { error: true, data: null, message: "Failed to create booking" };
    }
  }

  async getBookings() {
    try {
      const bookings = await Booking.find();
      return { error: false, data: bookings };
    } catch (error) {
      console.error(error);
      return { error: true, data: null, message: "Failed to fetch bookings" };
    }
  }

  async getBookingById(id) {
    try {
      const booking = await Booking.findById(id);
      return { error: false, data: booking };
    } catch (error) {
      console.error(error);
      return { error: true, data: null, message: "Failed to fetch booking" };
    }
  }

  async updateBooking(id, updatedBookingData) {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        updatedBookingData,
        { new: true }
      );
      return { error: false, data: updatedBooking };
    } catch (error) {
      console.error(error);
      return { error: true, data: null, message: "Failed to update booking" };
    }
  }

  async rejectBooking(bookingId) {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return { error: true, message: "Booking not found" };
      }

      if (booking.data.status === "Rejected") {
        return { error: true, message: "Booking is already rejected." };
      }

      booking.data.status = "Cancelled";
      booking.data.isRejected = true;
      booking.data.date_rejected = new Date();
      const updatedTask = await Booking.findByIdAndUpdate(
        bookingId,
        {
          "data.status": "Rejected",
          "data.isRejected": true,
        },
        { new: true }
      );

      if (!updatedTask) {
        return { error: true, message: "Failed to reject booking" };
      }

      return { error: false, data: updatedTask };
    } catch (error) {
      return { error: true, message: "Failed to reject booking." };
    }
  }

  async deleteBooking(id) {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);
      return deletedBooking
        ? { error: false, data: null }
        : { error: true, data: null };
    } catch (error) {
      console.error(error);
      return { error: true, data: null, message: "Failed to delete booking" };
    }
  }

  async checkBookingStatus(bookingId) {
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return { error: true, message: "Booking not found" };
      }
      const status = booking.status;
      return { error: false, data: status };
    } catch (error) {
      return { error: true, message: "Failed to fetch booking status" };
    }
  }
}

module.exports = BookingService;
