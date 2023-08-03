const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  URL: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  date_time: {
    type: Date,
    required: true,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
