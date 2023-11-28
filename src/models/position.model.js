const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  short_title: {
    type: String,
    required: false,
  },
  job_description: {
    type: String,
    required: true,
    default: null,
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

const Position = mongoose.model("Position", PositionSchema);

module.exports = Position;
