const userModel = require("../models/userModel");

module.exports = {
  getAllUsers: async (page, pageSize) => {
    try {
      const users = await userModel.getUsers(page, pageSize);
      if (!users || users.length === 0) {
        throw new Error("No users found");
      }
      return users;
    } catch (error) {
      console.error("getAllUsers Error:", error.message);
      throw new Error("Failed to retrieve users");
    }
  },

  getAllActiveUsers: async () => {
    try {
      const activeUsers = await userModel.getActiveUsers();
      if (!activeUsers || activeUsers.length === 0) {
        throw new Error("No active users found");
      }
      return activeUsers;
    } catch (error) {
      console.error("getAllActiveUsers Error:", error.message);
      throw new Error("Failed to retrieve active users");
    }
  },

  getUser: async (id) => {
    try {
      const user = await userModel.getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("getUser Error:", error.message);
      throw new Error("Failed to retrieve user by ID");
    }
  },

  addUser: async (name, email) => {
    try {
      const newUser = await userModel.createUser(name, email);
      if (!newUser) {
        throw new Error("Failed to create user");
      }
      return newUser;
    } catch (error) {
      console.error("addUser Error:", error.message);
      throw new Error("Failed to create user");
    }
  },

  updateUser: async (id, name, email) => {
    try {
      const updatedUser = await userModel.updateUser(id, name, email);
      if (!updatedUser) {
        throw new Error("Failed to update user");
      }
      return updatedUser;
    } catch (error) {
      console.error("updateUserError:", error.message);
      throw new Error("Failed to update user");
    }
  },

  changeUserStatus: async (id, status) => {
    try {
      const updatedUser = await userModel.changeUserStatus(id, status);
      if (!updatedUser) {
        throw new Error("Failed to change user status");
      }
      return updatedUser;
    } catch (error) {
      console.error("changeUserStatus Error:", error.message);
      throw new Error("Failed to change user status");
    }
  },

  deleteUser: async (id) => {
    try {
      const result = await userModel.deleteUser(id);
      if (!result) {
        throw new Error("Failed to delete user");
      }
      return result;
    } catch (error) {
      console.error("deleteUser Error:", error.message);
      throw new Error("Failed to delete user");
    }
  },
};
