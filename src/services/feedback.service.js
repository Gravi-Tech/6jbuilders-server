const Feedback = require("../models/feedback.model");

class FeedbackService {
  constructor() {}

  async addFeedback(feedbackData) {
    try {
      const feedbackWithDefaultValues = {
        ...feedbackData,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const savedFeedback = await Feedback.create(feedbackWithDefaultValues);
      return { error: false, data: savedFeedback };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getFeedback() {
    try {
      const feedbackList = await Feedback.find({});
      return { error: false, data: feedbackList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getFeedbackById(id) {
    try {
      const feedback = await Feedback.findById(id);
      return feedback
        ? { error: false, data: feedback }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateFeedback(id, updatedFeedbackData) {
    try {
      const feedback = await Feedback.findById(id);
      if (!feedback) {
        return { error: true, data: "Feedback not found" };
      }

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        id,
        { ...updatedFeedbackData, date_updated: new Date() },
        { new: true }
      );

      return updatedFeedback
        ? { error: false, data: updatedFeedback }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateFeedbackIsPosted(id, isPosted) {
    try {
      const feedback = await Feedback.findById(id);
      if (!feedback) {
        return { status: 404, error: true, data: "Feedback not found" };
      }

      feedback.isPosted = isPosted;
      feedback.date_updated = new Date();

      const updatedFeedback = await feedback.save();

      return updatedFeedback
        ? { status: 200, error: false, data: updatedFeedback }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteFeedback(id) {
    try {
      const deletedFeedback = await Feedback.findByIdAndDelete(id);
      return deletedFeedback
        ? { error: false, data: deletedFeedback }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = FeedbackService;
