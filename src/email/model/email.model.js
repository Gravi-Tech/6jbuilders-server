const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  recipientName: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email;
