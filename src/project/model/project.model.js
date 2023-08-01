const mongoose = require("mongoose");

const projectTypes = [
  "Residential Construction",
  "Commercial Construction",
  "Industrial Construction",
  "Infrastructure Construction",
];

const ProjectSchema = new mongoose.Schema({
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
  project_type: {
    type: String,
    enum: projectTypes,
    required: true,
  },
  material_cost: {
    type: Number,
    required: true,
  },
  project_cost: {
    type: Number,
    required: true,
  },
  is_fullypaid: {
    type: Boolean,
    required: false,
  },
  total_payment: {
    type: Number,
    required: true,
  },
  status: {
    type: String,

    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
