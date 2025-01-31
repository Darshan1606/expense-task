const userService = require("../services/userService");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      const users = await userService.getAllUsers(page, pageSize);

      res.status(200).json({
        success: true,
        message: "Retrieved all users successfully",
        data: users.data,
        pagination: users.pagination,
      });
    } catch (error) {
      console.error("getAllUsers Error:", error.message);
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      console.error("getUserById Error:", error.message);
      next(error);
    }
  },

  addUser: async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const newUser = await userService.addUser(name, email);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        result: newUser,
      });
    } catch (error) {
      console.error("addUser Error:", error.message);
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const updatedUser = await userService.updateUser(
        req.params.id,
        name,
        email
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        result: updatedUser,
      });
    } catch (error) {
      console.error("updateUser Error:", error.message);
      next(error);
    }
  },

  changeUserStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      const updatedUser = await userService.changeUserStatus(
        req.params.id,
        status
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User status updated successfully",
        result: updatedUser,
      });
    } catch (error) {
      console.error("changeUserStatus Error:", error.message);
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      await userService.deleteUser(req.params.id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("deleteUser Error:", error.message);
      next(error);
    }
  },
};
