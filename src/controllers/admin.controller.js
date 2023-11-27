const AdminService = require("../services/admin.service");
const adminService = new AdminService();
const Authorization = require("../middlewares/authorization");
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

  static async login(req, res) {
    try {
      const { accountNumber, password } = req.body;
      const admin = await adminService.login(accountNumber, password);

      if (!admin) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid credentials" });
      }

      const accessToken = Authorization.getAccessToken({ adminId: admin.id });

      req.admin = admin;

      const adminDetails = await adminService.getAdminDetails(admin.id);
      const { id } = adminDetails;

      return res.json({
        message: "Login successful",
        accessToken,
        id,
      });
    } catch (error) {
      return res.status(500).json({ error: true, message: "Failed to login" });
    }
  }

  static async checkAccountNumber(req, res) {
    try {
      const { accountNumber } = req.query;
      const exists = await adminService.checkAccountNumber(accountNumber);
      if (exists) {
        return res.json({ message: "Account number exists" });
      } else {
        return res.json({ message: "Account number does not exist" });
      }
    } catch (error) {
      console.error("Failed to check account number:", error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to check account number" });
    }
  }
}

module.exports = AdminController;
