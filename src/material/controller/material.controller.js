const MaterialService = require("../../material/service/material.service");
const materialService = new MaterialService();

class MaterialController {
  constructor() {}

  static async addMaterial(req, res) {
    try {
      const newMaterial = await materialService.addMaterial(req.body);
      return res.json(newMaterial);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add material" });
    }
  }

  static async getMaterials(req, res) {
    try {
      const materials = await materialService.getMaterials();
      return res.json(materials);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch materials" });
    }
  }

  static async getMaterialById(req, res) {
    try {
      const { id } = req.params;
      const material = await materialService.getMaterialById(id);
      if (!material) {
        return res
          .status(404)
          .json({ error: true, message: "Material not found" });
      }
      return res.json(material);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch material" });
    }
  }

  static async updateMaterial(req, res) {
    try {
      const { id } = req.params;
      const updatedMaterial = await materialService.updateMaterial(
        id,
        req.body
      );
      if (!updatedMaterial) {
        return res
          .status(404)
          .json({ error: true, message: "Material not found" });
      }
      return res.json(updatedMaterial);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update material" });
    }
  }

  static async deleteMaterial(req, res) {
    try {
      const { id } = req.params;
      const deletedMaterial = await materialService.deleteMaterial(id);
      if (!deletedMaterial) {
        return res
          .status(404)
          .json({ error: true, message: "Material not found" });
      }
      return res.json(deletedMaterial);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete material" });
    }
  }
}

module.exports = MaterialController;
