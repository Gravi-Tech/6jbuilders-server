const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Booking",
  },
  rate: {
    type: Number,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
