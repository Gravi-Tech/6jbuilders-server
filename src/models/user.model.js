const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
    default: "Active",
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

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
