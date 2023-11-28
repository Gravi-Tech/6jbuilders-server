const DataTypeService = require("../services/data_type.service");
const dataTypeService = new DataTypeService();

class DataTypeController {
  static async addType(req, res) {
    try {
      const newType = await dataTypeService.addType(req.body);
      return res.json(newType);
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, error: true, message: "Failed to add data type" });
    }
  }

  static async getTypes(req, res) {
    try {
      const type = await dataTypeService.getTypes();
      return res.json(type);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: "Failed to fetch data types",
      });
    }
  }

  static async getTypeById(req, res) {
    try {
      const { id: typeId } = req.params;
      const type = await dataTypeService.getTypeById(typeId);
      if (!type) {
        return res.status(404).json({ error: true, message: "Type not found" });
      }
      return res.json(type);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch data type" });
    }
  }

  static async updateType(req, res) {
    try {
      const { id: typeId } = req.params;
      const updatedType = await dataTypeService.updateType(typeId, req.body);
      if (!updatedType) {
        return res
          .status(404)
          .json({ status: 404, error: true, message: "Data type not found" });
      }
      return res.json(updatedType);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update data type" });
    }
  }

  static async deleteType(req, res) {
    try {
      const { id: typeId } = req.params;
      const deletedType = await dataTypeService.deleteType(typeId);
      if (!deletedType) {
        return res
          .status(404)
          .json({ error: true, message: "Data Type not found" });
      }
      return res.json(deletedType);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: true,
        message: "Failed to delete data",
      });
    }
  }
}

module.exports = DataTypeController;
