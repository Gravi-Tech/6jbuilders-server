const AdminService = require("../services/admin.service");
const adminService = new AdminService();
const Authorization = require("../middlewares/authorization");
const moment = require("moment");

class AdminController {
  constructor() {}

  static async addAdmin(req, res) {
    try {
      const { role } = req.body;
      let accountNumber;

      if (role === "superadmin" || role === "admin") {
        const prefix = role === "superadmin" ? "SD" : "AD";
        const currentDate = moment().format("DDYY");
        const randomNumbers = generateRandomNumbers(6);
        accountNumber = `${prefix}${currentDate}${randomNumbers}`;
      } else {
        return res.status(400).json({ error: true, message: "Invalid role" });
      }

      const newAdmin = await adminService.addAdmin({
        ...req.body,
        accountNumber,
      });

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

  static async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      const response = await adminService.getAdminById(id);
      const admin = response.data;

      if (!admin) {
        return res
          .status(404)
          .json({ error: true, message: "Admin not found" });
      }

      const isPasswordValid = await adminService.verifyPassword(
        admin.password,
        currentPassword
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid current password" });
      }

      const updatedAdmin = await adminService.updateAdminPassword(
        admin,
        newPassword
      );

      return res.json(updatedAdmin);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update password" });
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
      const { accountNumber } = await req.body;
      console.log({accountNumber});
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

  static async checkEmail(req, res) {
    try {
      let exists = false;
      const { email, oldEmail } = req.body;
      if(email !== oldEmail){
        exists = await adminService.checkEmail(email);
      }
      if (exists) {
        return res.json({ message: "email account exists" });
      }
    } catch (error) {
      console.error("Failed to check email account:", error);
      return res
        .status(500)
        .json({ error: true, message: "Failed to check email account" });
    }
  }
  
}

function generateRandomNumbers(length) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = AdminController;
