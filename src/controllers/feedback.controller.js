const FeebackService = require("../services/feedback.service");
const feedbackService = new FeebackService();

class FeedbackController {
  static async addFeedback(req, res) {
    try {
      const newFeedback = await feedbackService.addFeedback(req.body);
      return res.json(newFeedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add position" });
    }
  }

  static async getFeedback(req, res) {
    try {
      const position = await feedbackService.getFeedback();
      return res.json(position);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch position" });
    }
  }

  static async getFeedbackById(req, res) {
    try {
      const { id: feedbackId } = req.params;
      const feedback = await feedbackService.getFeedbackById(feedbackId);
      if (!feedback) {
        return res
          .status(404)
          .json({ error: true, message: "Feedback not found" });
      }
      return res.json(feedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch feedbacks" });
    }
  }

  static async updateFeedback(req, res) {
    try {
      const { id: feedbackId } = req.params;
      const updatedFeedback = await feedbackService.updateFeedback(
        feedbackId,
        req.body
      );
      if (!updatedFeedback) {
        return res
          .status(404)
          .json({ error: true, message: "Position not found" });
      }
      return res.json(updatedFeedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update position" });
    }
  }

  static async updateFeedbackIsPosted(req, res) {
    try {
      const { id: feedbackId } = req.params;
      const { isPosted } = req.body;
      const updatedFeedback = await feedbackService.updateFeedbackIsPosted(
        feedbackId,
        isPosted
      );
      if (!updatedFeedback) {
        return res
          .status(404)
          .json({ error: true, message: "Feedback not found" });
      }
      return res.json(updatedFeedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update feedback" });
    }
  }

  static async postFeedbackAsTestimonial(req, res) {
    try {
      const { id: feedbackId } = req.params;
      const feedback = await feedbackService.getFeedbackById(feedbackId);
      if (!feedback) {
        return res
          .status(404)
          .json({ status: 404, error: true, message: "Feedback not found" });
      }
      if (feedback.isPosted) {
        return res.status(400).json({
          status: 400,
          error: true,
          message: "Feedback is already posted",
        });
      }
      const updatedFeedback = await feedbackService.updateFeedbackIsPosted(
        feedbackId,
        true
      );
      return res.json({ status: 200, updatedFeedback });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: "Failed to post feedback as testimonial",
      });
    }
  }

  static async deleteFeedback(req, res) {
    try {
      const { id: feedbackId } = req.params;
      const deletedFeedback = await feedbackService.deleteFeedback(feedbackId);
      if (!deletedFeedback) {
        return res
          .status(404)
          .json({ error: true, message: "Position not found" });
      }
      return res.json(deletedFeedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete position" });
    }
  }
}

module.exports = FeedbackController;
