const Booking = require("../models/user.model");

class BookingService {
  constructor() {}

  async createBooking(bookingData) {
    try {
      const savedBooking = await Booking.create(bookingData);
      return { error: false, data: savedBooking };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getBookings() {
    try {
      const bookingList = await Booking.find({});
      return { error: false, data: bookingList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getBookingById(id) {
    try {
      const booking = await Booking.findById(id);
      return booking
        ? { error: false, data: booking }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateBooking(id, updatedBookingData) {
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        updatedBookingData,
        {
          new: true,
        }
      )
        .populate("service_id")
        .populate("user_id")
        .populate("assignee_ids");
      return updatedBooking
        ? { error: false, data: updatedBooking }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }

  async deleteBooking(id) {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(id);
      return deletedBooking
        ? { error: false, data: deletedBooking }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error.message };
    }
  }
}

module.exports = BookingService;
