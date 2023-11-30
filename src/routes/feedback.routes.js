const express = require("express");
const router = express.Router();
const Authorization = require("../middlewares/authorization");
const FeedbackController = require("../controllers/feedback.controller");

router.get("/feedbacks", Authorization.authorized, FeedbackController.getFeedback);
router.get("/public-feedbacks", FeedbackController.getFeedback);
router.post("/feedbacks", FeedbackController.addFeedback);
router.get("/feedbacks/:id", Authorization.authorized, FeedbackController.getFeedbackById);
router.put("/feedbacks/:id", Authorization.authorized, FeedbackController.updateFeedback);
router.put("/feedbacks/:id/post-testimonial", Authorization.authorized, FeedbackController.postFeedbackAsTestimonial);
router.delete("/feedbacks/:id", Authorization.authorized, FeedbackController.deleteFeedback);

module.exports = router;