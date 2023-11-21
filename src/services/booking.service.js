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

  async deleteBooking(id) {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);
      return { error: false, data: deletedBooking };
    } catch (error) {
      console.error(error);
      return { error: true, data: null, message: "Failed to delete booking" };
    }
  }
}

module.exports = BookingService;
