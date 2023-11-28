const PositionService = require("../services/position.service");
const positionService = new PositionService();

class PositionController {
  static async addPosition(req, res) {
    try {
      const newPosition = await positionService.addPosition(req.body);
      return res.json(newPosition);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add position" });
    }
  }

  static async getPosition(req, res) {
    try {
      const position = await positionService.getPosition();
      return res.json(position);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch position" });
    }
  }
  static async getPositionById(req, res) {
    try {
      const { id: positionId } = req.params;
      const position = await positionService.getPositionById(positionId);
      if (!position) {
        return res
          .status(404)
          .json({ error: true, message: "Position not found" });
      }
      return res.json(position);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch positions" });
    }
  }

  static async updatePosition(req, res) {
    try {
      const { id: positionId } = req.params;
      const updatedPosition = await positionService.updatePosition(
        positionId,
        req.body
      );
      if (!updatedPosition) {
        return res
          .status(404)
          .json({ error: true, message: "Position not found" });
      }
      return res.json(updatedPosition);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update position" });
    }
  }

  static async deletePosition(req, res) {
    try {
      const { id: positionId } = req.params;
      const deletedPosition = await positionService.deletePosition(positionId);
      if (!deletedPosition) {
        return res
          .status(404)
          .json({ error: true, message: "Position not found" });
      }
      return res.json(deletedPosition);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete position" });
    }
  }
}

module.exports = PositionController;
