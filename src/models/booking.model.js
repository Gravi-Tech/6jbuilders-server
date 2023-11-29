const mongoose = require("mongoose");

const bookStatus = ["Pending", "Rejected", "Accepted"];

const BookingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    required: true,
  },
  schedule_date: {
    type: Date,
    required: true,
  },
  isRejected: {
    type: Boolean,
    required: true,
    default: false,
  },
  date_rejected: {
    type: Date,
    required: false,
    default: null,
  },
  isAccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    enum: bookStatus,
    default: "Pending",
  },
  note: {
    type: String,
    required: false,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
