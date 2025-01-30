const userService = require("../services/userService");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json({
        success: true,
        message: "get all users successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get users" });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  },
  addUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const newUser = await userService.addUser(name, email);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, email } = req.body;
      const updatedUser = await userService.updateUser(
        req.params.id,
        name,
        email
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  },
  changeUserStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const updatedUser = await userService.changeUserStatus(
        req.params.id,
        status
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user status" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};
