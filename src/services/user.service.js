const Users = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = class UserService {
  constructor() {}

  async addUser(user) {
    try {
      const { password } = user;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const saved = await Users.create({
        ...user,
        password: hashedPassword,
      });
      return { error: false, data: saved };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async login(mobile_number, password) {
    try {
      const user = await Users.findOne({ mobile_number });

      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return null;
      }

      return user;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }

  async getUserDetails(userId) {
    try {
      const user = await Users.findById(userId);
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user details");
    }
  }


  async getUsers() {
    try {
      const list = await Users.find({});
      return { error: false, data: list };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async getUserById(id) {
    try {
      const user = await Users.findById(id);
      return user ? { error: false, data: user } : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async updateUser(id, updatedUser) {
    try {
      const user = await Users.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      return user ? { error: false, data: user } : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  async deleteUser(id) {
    try {
      const user = await Users.findByIdAndDelete(id);
      return user ? { error: false, data: user } : { error: true, data: null };
    } catch (error) {
      return { error: true, data: error };
    }
  }
};
