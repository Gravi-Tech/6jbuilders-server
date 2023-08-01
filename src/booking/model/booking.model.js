const mongoose = require("mongoose");

const bookStatus = ['Open', 'In Progess', 'Complete', 'Unverified'];

const BookingSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Service",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  site_location: {
    type: String,
    required: true,
  },
  book_date: {
    type: Date,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  completed_date: {
    type: Date,
    required: false,
  },
  is_extended: {
    type: Boolean,
    required: false,
  },
  is_verified: {
    type: Boolean,
    required: false,
  },
  status: {
    type: String,
    enum: bookStatus,
    default: 'Open'
  },
  attachment: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  feedback_ids: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Feedback",
  },
  material_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
  assignee_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Assignee",
    },
  ],
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
