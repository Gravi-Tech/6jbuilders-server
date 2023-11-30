const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");

class AdminService {
  constructor() {}

  async addAdmin(adminData) {
    try {
      const { password } = adminData;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const savedAdmin = await Admin.create({
        ...adminData,
        password: hashedPassword,
      });
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

  async login(accountNumber, password) {
    try {
      const admin = await Admin.findOne({ accountNumber });

      if (!admin) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        return null;
      }

      return admin;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }

  async getAdminDetails(adminId) {
    try {
      const admin = await Admin.findById(adminId);
      return admin;
    } catch (error) {
      throw new Error("Failed to fetch admin details");
    }
  }

  async checkAccountNumber(accountNumber) {
    try {
      const existingAdmin = await Admin.findOne({ accountNumber });
      const exists = !!existingAdmin;
      return exists;
    } catch (error) {
      console.error("Failed to check account number:", error);
      throw error;
    }
  }

  async verifyPassword(password, currentPassword) {
    try {
      const isPasswordValid = await bcrypt.compare(currentPassword, password);
      return isPasswordValid;
    } catch (error) {
      throw error;
    }
  }

  async updateAdminPassword(admin, newPassword) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const updatedAdmin = await Admin.findByIdAndUpdate(
        admin._id,
        { password: hashedPassword },
        { new: true }
      );

      return updatedAdmin
        ? { error: false, data: updatedAdmin }
        : { error: true, data: null };
    } catch (error) {
      console.error("Failed to update admin password:", error);
      throw error;
    }
  }
}

module.exports = AdminService;
