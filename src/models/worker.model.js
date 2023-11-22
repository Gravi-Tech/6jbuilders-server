const mongoose = require("mongoose");
const WorkerSchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: true,
  },
 position: {
    type: String,
    required: false,
  },
 contact: {
    type: String,
    required: false,
  },
  address: {
      type: String,
      required: false,
    },
experience: {
      type: String,
      required: false,
    },
  
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

const Worker = mongoose.model("Worker", WorkerSchema);
module.exports =Worker;
