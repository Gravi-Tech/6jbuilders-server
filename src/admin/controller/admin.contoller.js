const AdminService = require("../../admin/service/admin.service");
const adminService = new AdminService();

class AdminController {
  constructor() {}

  static async addAdmin(req, res) {
    try {
      const newAdmin = await adminService.addAdmin(req.body);
      return res.json(newAdmin);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add admin" });
    }
  }

  static async getAdmins(req, res) {
    try {
      const admins = await adminService.getAdmins();
      return res.json(admins);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch admins" });
    }
  }

  static async getAdminById(req, res) {
    try {
      const { id } = req.params;
      const admin = await adminService.getAdminById(id);
      if (!admin) {
        return res
          .status(404)
          .json({ error: true, message: "Admin not found" });
      }
      return res.json(admin);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch admin" });
    }
  }

  static async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const updatedAdmin = await adminService.updateAdmin(id, req.body);
      if (!updatedAdmin) {
        return res
          .status(404)
          .json({ error: true, message: "Admin not found" });
      }
      return res.json(updatedAdmin);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update admin" });
    }
  }

  static async deleteAdmin(req, res) {
    try {
      const { id } = req.params;
      const deletedAdmin = await adminService.deleteAdmin(id);
      if (!deletedAdmin) {
        return res
          .status(404)
          .json({ error: true, message: "Admin not found" });
      }
      return res.json(deletedAdmin);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete admin" });
    }
  }
}

module.exports = AdminController;
