const FeedbackService = require("../services/feedback.service");
const feedbackService = new FeedbackService();

class FeedbackController {
  constructor() {}

  static async addFeedback(req, res) {
    try {
      const newFeedback = await feedbackService.addFeedback(req.body);
      return res.json(newFeedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add feedback" });
    }
  }

  static async getFeedbacks(req, res) {
    try {
      const feedbacks = await feedbackService.getFeedbacks();
      return res.json(feedbacks);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch feedbacks" });
    }
  }

  static async getFeedbackById(req, res) {
    try {
      const { id } = req.params;
      const feedback = await feedbackService.getFeedbackById(id);
      if (!feedback) {
        return res
          .status(404)
          .json({ error: true, message: "Feedback not found" });
      }
      return res.json(feedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch feedback" });
    }
  }

  static async updateFeedback(req, res) {
    try {
      const { id } = req.params;
      const updatedFeedback = await feedbackService.updateFeedback(
        id,
        req.body
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

  static async deleteFeedback(req, res) {
    try {
      const { id } = req.params;
      const deletedFeedback = await feedbackService.deleteFeedback(id);
      if (!deletedFeedback) {
        return res
          .status(404)
          .json({ error: true, message: "Feedback not found" });
      }
      return res.json(deletedFeedback);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete feedback" });
    }
  }
}

module.exports = FeedbackController;
