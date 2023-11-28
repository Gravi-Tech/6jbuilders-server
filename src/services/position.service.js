const Position = require("../models/position.model");

class PositionService {
  constructor() {}

  async addPosition(positionData) {
    try {
      const positionWithDefaultValues = {
        ...positionData,
        created_date: new Date(),
        updated_date: new Date(),
      };
      const savedPosition = await Position.create(positionWithDefaultValues);
      return { error: false, data: savedPosition };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getPosition() {
    try {
      const positionList = await Position.find({});
      return { error: false, data: positionList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getPositionById(id) {
    try {
      const position = await Position.findById(id);
      return position
        ? { error: false, data: position }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updatePosition(id, updatedPositionData) {
    try {
      const position = await Position.findById(id);
      if (!position) {
        return { error: true, data: "position not found" };
      }

      const updatedPosition = await Position.findByIdAndUpdate(
        id,
        { ...updatedPositionData, updated_date: new Date() },
        { new: true }
      );

      return updatedPosition
        ? { error: false, data: updatedPosition }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deletePosition(id) {
    try {
      const deletedPosition = await Position.findByIdAndDelete(id);
      return deletedPosition
        ? { error: false, data: deletedPosition }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = PositionService;
