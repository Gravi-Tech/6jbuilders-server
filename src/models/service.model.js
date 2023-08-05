const mongoose = require("mongoose");

const serviceTypes = [
  "Home Renovation",
  "Interior Design",
  "Plumbing",
  "Electrical",
  "Drywall Installation",
  "Tile Installation",
  "Glass and Aluminum Installation",
  "Welding",
  "Roofing",
  "Cabinets",
  "Home Repair Services",
];

const statusTypes = [
  "Available",
  "Not Available"
]

const ServiceSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  service_type: {
    type: String,
    required: true,
    enum: serviceTypes,
    default: "Home Renovation",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: statusTypes,
    default: "Available",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
