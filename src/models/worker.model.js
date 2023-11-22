const mongoose = require("mongoose");
const WorkerSchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: true,
    unique: true,
  },
 position: {
    type: String,
    required: false,
  },
 contact: {
    type: String,
    enum: statusTypes,
    required: false,
  },

  address: {
      type: String,
      enum: statusTypes,
      required: false,
    },

    contact: {
      type: String,
      enum: statusTypes,
      required: false,
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

const Worker = mongoose.model("Worker", WorkerSchema);
module.exports =Worker;
