const mongoose = require("mongoose");

const statusTypes = ["Active", "Deleted", "Inactive"];
const roles = ["admin", "superadmin"];

const AdminSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roles,
    required: false,
    default: "admin"
  },
  status: {
    type: String,
    enum: statusTypes,
    default: "Active",
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false
  },
  address: {
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
