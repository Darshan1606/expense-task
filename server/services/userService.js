const userModel = require("../models/userModel");

module.exports = {
  getAllUsers: async () => {
    return await userModel.getUsers();
  },
  getAllActiveUsers: async () => {
    return await userModel.getActiveUsers();
  },
  getUser: async (id) => {
    return await userModel.getUserById(id);
  },
  addUser: async (name, email) => {
    return await userModel.createUser(name, email);
  },
  updateUser: async (id, name, email) => {
    return await userModel.updateUser(id, name, email);
  },
  changeUserStatus: async (id, status) => {
    return await userModel.changeUserStatus(id, status);
  },
  deleteUser: async (id) => {
    return await userModel.deleteUser(id);
  },
};
