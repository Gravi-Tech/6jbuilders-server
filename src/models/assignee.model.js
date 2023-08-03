const mongoose = require("mongoose");

const AssigneeSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  project_type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  material_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
  ],
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

const Assignee = mongoose.model("Assignee", AssigneeSchema);

module.exports = Assignee;
