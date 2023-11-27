const ReasonService = require("../services/reason.service");
const reasonService = new ReasonService();

class ReasonController {
  static async addReason(req, res) {
    try {
      const newReason = await reasonService.addReason(req.body);
      return res.json(newReason);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add reason" });
    }
  }

  static async getReasons(req, res) {
    try {
      const reason = await reasonService.getReasons();
      return res.json(reason);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch reason" });
    }
  }

  static async getReasonById(req, res) {
    try {
      const { id: reasonId } = req.params;
      const reason = await reasonService.getReasonById(reasonId);
      if (!reason) {
        return res
          .status(404)
          .json({ error: true, message: "Reason not found" });
      }
      return res.json(reason);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch reason" });
    }
  }

  static async updateRason(req, res) {
    try {
      const { id: reasonId } = req.params;
      const updatedReason = await reasonService.updateReason(
        reasonId,
        req.body
      );
      if (!updatedReason) {
        return res
          .status(404)
          .json({ error: true, message: "Reason not found" });
      }
      return res.json(updatedReason);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update reason" });
    }
  }

  static async deleteReason(req, res) {
    try {
      const { id: reasonId } = req.params;
      const deletedResult = await reasonService.deleteReason(reasonId);
      if (!deletedResult) {
        return res
          .status(404)
          .json({ error: true, message: "Reason not found" });
      }
      return res.json({ message: "Successfully deleted reason", data: null });
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete reason" });
    }
  }
}

module.exports = ReasonController;
