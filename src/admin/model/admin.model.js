const mongoose = require("mongoose");

const statusTypes = ["Active", "Deleted", "Inactive"];

const AdminSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  account_id: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: statusTypes,
    default: "Active",
  },
  email: {
    type: String,
    unique: true,
  },
  mobile_number: {
    type: String,
  },
  current_address: {
    type: String,
  },
  permanent_address: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
