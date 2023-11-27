const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
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
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
  date_started: {
    type: Date,
    required: false,
    default: null,
  },
  date_completed: {
    type: Date,
    required: false,
    default: null,
  },
  date_cancelled: {
    type: Date,
    required: false,
    default: null,
  },
  schedule_date: {
    type: Date,
    required: true,
  },
  inspection_date: {
    type: Date,
    required: true,
  },
  total_amount: {
    type: String,
    required: false,
    default: null,
  },
  inspection_time_range: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false,
  },
  isVisited: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    enum: ["Pending", "Cancelled", "In Progress", "Completed"],
    required: true,
    default: "Pending",
  },
  note: {
    type: String,
    required: false,
    default: null,
  },
  reasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reason",
    required: false,
    default: null,
  },
  otherReason: {
    type: String,
    required: false,
    default: null,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
