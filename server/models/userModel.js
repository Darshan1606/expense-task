const pool = require("../config/db");

module.exports = {
  getUsers: async (page, pageSize) => {
    try {
      const offset = (page - 1) * pageSize;

      // Query to fetch paginated users
      const userQuery = `
        SELECT * FROM users 
        ORDER BY id DESC 
        LIMIT $1 OFFSET $2
      `;

      // Query to get total user count (for pagination metadata)
      const countQuery = `SELECT COUNT(*) FROM users`;

      // Execute both queries
      const [usersResult, countResult] = await Promise.all([
        pool.query(userQuery, [pageSize, offset]),
        pool.query(countQuery),
      ]);

      // Extract total user count
      const totalRecords = parseInt(countResult.rows[0].count, 10);

      return {
        data: usersResult.rows,
        pagination: {
          totalRecords,
          currentPage: page,
          pageSize,
        },
      };
    } catch (error) {
      console.error("Error querying users:", error.message);
      throw new Error("Database query failed");
    }
  },

  getActiveUsers: async () => {
    try {
      const result = await pool.query(
        "SELECT id AS value, name AS label FROM users WHERE status = 'active'"
      );
      return result.rows;
    } catch (error) {
      console.error("Error querying active users:", error.message);
      throw new Error("Database query failed");
    }
  },

  getUserByEmail: async (email) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
        [email]
      );
      return result.rows[0] || null; // Return null if no user is found
    } catch (error) {
      console.error(`Error querying user by email ${email}:`, error.message);
      throw new Error("Database query failed");
    }
  },

  getUserById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null; // Return null if no user is found
    } catch (error) {
      console.error(`Error querying user by id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },

  createUser: async (name, email) => {
    try {
      const result = await pool.query(
        "INSERT INTO users (name, email, status) VALUES ($1, $2, $3) RETURNING *",
        [name, email, "active"]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting user:", error.message);
      throw new Error("Database query failed");
    }
  },

  updateUser: async (id, name, email) => {
    try {
      const result = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
      );
      return result.rows[0] || null; // Return null if no user is updated
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },

  changeUserStatus: async (id, status) => {
    try {
      const result = await pool.query(
        "UPDATE users SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
      );
      return result.rows[0] || null; // Return null if no user status is changed
    } catch (error) {
      console.error(
        `Error changing status for user with id ${id}:`,
        error.message
      );
      throw new Error("Database query failed");
    }
  },

  deleteUser: async (id) => {
    try {
      const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
      return result.rowCount || null; // Return null if no user status
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },
};
