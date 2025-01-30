const pool = require("../config/db");

module.exports = {
  getAdminByEmail: async (email) => {
    const result = await pool.query(
      "SELECT * FROM admin WHERE LOWER(email) = LOWER($1)",
      [email]
    );
    return result.rows[0];
  },
};
