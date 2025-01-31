const pool = require("../config/db");

module.exports = {
  getAdminByEmail: async (email) => {
    try {
      const result = await pool.query(
        "SELECT * FROM admin WHERE LOWER(email) = LOWER($1)",
        [email]
      );
      return result.rows[0] || null; // Return null if no row is found
    } catch (error) {
      console.error("Error querying database:", error.message);
      throw new Error("Database query failed");
    }
  },
};
