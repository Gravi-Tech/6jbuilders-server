const express = require("express");
const router = express.Router();
const Authorization = require('../../middlewares/authorization');
const FeedbackController = require('../controller/feedback.controller');

router.get("/feedbacks", Authorization.authorized, FeedbackController.getFeedbacks);
router.post("/feedbacks", Authorization.authorized, FeedbackController.addFeedback);
router.get("/feedbacks/:id", Authorization.authorized, FeedbackController.getFeedbackById);
router.put("/feedbacks/:id", Authorization.authorized, FeedbackController.updateFeedback);
router.delete("/feedbacks/:id", Authorization.authorized, FeedbackController.deleteFeedback);

module.exports = router;
