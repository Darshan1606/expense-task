const adminModel = require("../models/adminModel");

module.exports = {
  getAdminByEmail: async () => {
    return await adminModel.getAdminByEmail();
  },
};
