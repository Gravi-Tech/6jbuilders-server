const express = require("express");
const router = express.Router();
const Authorization = require('../middlewares/authorization');
const NotificationController = require('../controllers/notification.controller');

router.get("/notifications", Authorization.authorized, NotificationController.getNotifications);
router.post("/notifications", Authorization.authorized, NotificationController.addNotification);
router.get("/notifications/:id", Authorization.authorized, NotificationController.getNotificationById);
router.delete("/notifications/:id", Authorization.authorized, NotificationController.deleteNotification);

module.exports = router;
