const mongoose = require("mongoose");

const DataTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  short_title: {
    type: String,
    required: false,
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

const Position = mongoose.model("DataType", DataTypeSchema);

module.exports = Position;
