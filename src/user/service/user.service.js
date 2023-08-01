const Users = require("../../user/model/user.model");

module.exports = class UserService {
  constructor() {}

  async addUser(user) {
    try {
      const saved = await Users.create(user);
      return { error: false, data: saved };
    } catch (error) {
      return { error: true, data: error };
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