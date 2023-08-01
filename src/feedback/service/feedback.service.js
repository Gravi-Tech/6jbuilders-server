const Feedback = require("../../feedback/model/feedback.model");

class FeedbackService {
  constructor() {}

  async addFeedback(feedbackData) {
    try {
      const savedFeedback = await Feedback.create(feedbackData);
      return { error: false, data: savedFeedback };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getFeedbacks() {
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
        { ...updatedFeedbackData, updated_date: new Date() },
        { new: true }
      );

      return updatedFeedback
        ? { error: false, data: updatedFeedback }
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
