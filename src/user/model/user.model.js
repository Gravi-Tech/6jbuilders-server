const mongoose = require("mongoose");

const clientTypes = ['Individual', 'Company', 'Contractor', 'Architect', 'Other'];

const UsersSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  client_type: {
    type: String,
    enum: clientTypes,
    required: false,
  },
  fullname: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
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
  },
  status: {
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

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;