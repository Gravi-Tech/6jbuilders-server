const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
    default: "Customer",
  },
  message: {
    type: String,
    required: true,
  },
  isPosted: {
    type: Boolean,
    required: true,
    default: false,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
