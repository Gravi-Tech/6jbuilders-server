const UserService = require("../services/user.service");
const service = new UserService();

class UserController {
  constructor() {}

  static async addUser(req, res) {
    try {
      const newUser = await service.addUser(req.body);
      return res.json(newUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to add user" });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await service.getUsers();
      return res.json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch users" });
    }
  }

  static async login(req, res) {
    try {
      const { mobile_number, password } = req.body;
      const user = await service.login(mobile_number, password);

      if (!user) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid credentials" });
      }

      req.user = user;

      const userDetails = await service.getUserDetails(user.id);
      const { id } = userDetails;

      return res.json({
        message: "Login successful",
        id,
      });
    } catch (error) {
      return res.status(500).json({ error: true, message: "Failed to login" });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await service.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to fetch user" });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await service.updateUser(id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      return res.json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update user" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await service.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      return res.json(deletedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete user" });
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const { id } = req.user;
      const updatedUser = await service.updateUser(id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      return res.json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to update user profile" });
    }
  }

  static async deleteUserProfile(req, res) {
    try {
      const { id } = req.user;
      const deletedUser = await service.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ error: true, message: "User not found" });
      }
      return res.json(deletedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, message: "Failed to delete user profile" });
    }
  }
}

module.exports = UserController;
