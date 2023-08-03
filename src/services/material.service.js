const Material = require("../models/material.model");

class MaterialService {
  constructor() {}

  async addMaterial(materialData) {
    try {
      const savedMaterial = await Material.create(materialData);
      return { error: false, data: savedMaterial };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getMaterials() {
    try {
      const materialList = await Material.find({});
      return { error: false, data: materialList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getMaterialById(id) {
    try {
      const material = await Material.findById(id);
      return material
        ? { error: false, data: material }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateMaterial(id, updatedMaterialData) {
    try {
      const material = await Material.findById(id);
      if (!material) {
        return { error: true, data: "Material not found" };
      }

      const updatedMaterial = await Material.findByIdAndUpdate(
        id,
        { ...updatedMaterialData, updated_date: new Date() },
        { new: true }
      );

      return updatedMaterial
        ? { error: false, data: updatedMaterial }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteMaterial(id) {
    try {
      const deletedMaterial = await Material.findByIdAndDelete(id);
      return deletedMaterial
        ? { error: false, data: deletedMaterial }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = MaterialService;
