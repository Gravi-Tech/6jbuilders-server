const Admin = require("../models/admin.model");

class AdminService {
  constructor() {}

  async addAdmin(adminData) {
    try {
      const savedAdmin = await Admin.create(adminData);
      return { error: false, data: savedAdmin };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getAdmins() {
    try {
      const adminList = await Admin.find({});
      return { error: false, data: adminList };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getAdminById(id) {
    try {
      const admin = await Admin.findById(id);
      return admin
        ? { error: false, data: admin }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateAdmin(id, updatedAdminData) {
    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        return { error: true, data: "Admin not found" };
      }

      const updatedAdmin = await Admin.findByIdAndUpdate(
        id,
        { ...updatedAdminData, update_date: new Date() },
        { new: true }
      );

      return updatedAdmin
        ? { error: false, data: updatedAdmin }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteAdmin(id) {
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(id);
      return deletedAdmin
        ? { error: false, data: deletedAdmin }
        : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
}

module.exports = AdminService;
