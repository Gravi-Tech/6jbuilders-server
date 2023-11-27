const mongoose = require("mongoose");

const statusTypes = ["available", "soon", "unavailable"];

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  short_title: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: statusTypes,
    required: false,
    default: "available",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
