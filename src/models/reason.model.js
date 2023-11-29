const mongoose = require("mongoose");

const ReasonSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  description: {
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
});

const Reason = mongoose.model("Reason", ReasonSchema);

module.exports = Reason;
