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
}

module.exports = AdminService;
