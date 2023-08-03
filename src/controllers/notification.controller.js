const NotificationService = require("../../notification/service/notification.service");
const notificationService = new NotificationService();

class NotificationController {
  constructor() {}

  static async addNotification(req, res) {
    try {
      const newNotification = await notificationService.addNotification(
        req.body
      );
      return res.json(newNotification);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add notification" });
    }
  }

  static async getNotifications(req, res) {
    try {
      const notifications = await notificationService.getNotifications();
      return res.json(notifications);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch notifications" });
    }
  }

  static async getNotificationById(req, res) {
    try {
      const { id } = req.params;
      const notification = await notificationService.getNotificationById(id);
      if (!notification) {
        return res
          .status(404)
          .json({ error: true, message: "Notification not found" });
      }
      return res.json(notification);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch notification" });
    }
  }

  static async deleteNotification(req, res) {
    try {
      const { id } = req.params;
      const deletedNotification = await notificationService.deleteNotification(
        id
      );
      if (!deletedNotification) {
        return res
          .status(404)
          .json({ error: true, message: "Notification not found" });
      }
      return res.json(deletedNotification);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete notification" });
    }
  }
}

module.exports = NotificationController;
