const Notification = require("../../notification/model/notification.model");

class NotificationService {
  constructor() {}

  async addNotification(notificationData) {
    try {
      const savedNotification = await Notification.create(notificationData);
      return { error: false, data: savedNotification };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getNotifications() {
    try {
      const notificationList = await Notification.find({});
      return { error: false, data: notificationList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getNotificationById(id) {
    try {
      const notification = await Notification.findById(id);
      return notification
        ? { error: false, data: notification }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteNotification(id) {
    try {
      const deletedNotification = await Notification.findByIdAndDelete(id);
      return deletedNotification
        ? { error: false, data: deletedNotification }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = NotificationService;
