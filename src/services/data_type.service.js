const DataType = require("../models/data_type.model");

class DataTypeService {
  constructor() {}

  async addType(typeData) {
    try {
      const typeWithDefaultValues = {
        ...typeData,
        date_created: new Date(),
        date_updated: new Date(),
      };
      const savedType = await DataType.create(typeWithDefaultValues);
      return { status: 200, data: savedType };
    } catch (error) {
      return { status: 400, data: error };
    }
  }

  async getTypes() {
    try {
      const typeList = await DataType.find({});
      return { status: 200, data: typeList };
    } catch (error) {
      return { status: 400, data: error };
    }
  }

  async getTypeById(id) {
    try {
      const type = await DataType.findById(id);
      return type
        ? { status: 200, error: false, data: type }
        : { status: 404, error: true, data: null };
    } catch (error) {
      return { status: 500, error: true, data: error };
    }
  }

  async updateType(id, updatedTypeData) {
    try {
      const type = await DataType.findById(id);
      if (!type) {
        return { error: true, data: "Type not found" };
      }

      const updatedType = await DataType.findByIdAndUpdate(
        id,
        { ...updatedTypeData, date_updated: new Date() },
        { new: true }
      );

      return updatedType
        ? { status: 200, error: false, data: updatedType }
        : { error: true, data: null };
    } catch (error) {
      return { status: 500, error: true, data: error };
    }
  }

  async deleteType(id) {
    try {
      const deletedType = await DataType.findByIdAndDelete(id);
      return deletedType
        ? { status: 200, error: false, data: null }
        : { error: true, data: null };
    } catch (error) {
      return { status: 400, error: true, data: error };
    }
  }
}

module.exports = DataTypeService;
