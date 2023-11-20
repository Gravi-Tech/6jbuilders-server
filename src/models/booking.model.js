const mongoose = require("mongoose");

const bookStatus = ["Pending", "In Progress", "Rejected"];

const BookingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
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
  createdDate: {
    type: Date,
    required: true,
  },
  scheduleDate: {
    type: Date,
    required: true,
  },
  selectedTimeRange: {
    type: String,
    required: false,
  },
  isVisited: {
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
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
