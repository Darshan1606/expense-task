const adminModel = require("../models/adminModel");

module.exports = {
  getAdminByEmail: async (email) => {
    try {
      const admin = await adminModel.getAdminByEmail(email);
      if (!admin) {
        throw new Error("Admin not found");
      }
      return admin;
    } catch (error) {
      console.error("getAdminByEmail Error:", error.message);
      throw new Error("Failed to get admin by email");
    }
  },
};
