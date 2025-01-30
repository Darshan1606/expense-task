const pool = require("../config/db");

module.exports = {
  getUsers: async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  },
  getActiveUsers: async () => {
    const result = await pool.query(
      "SELECT id AS value, name AS label FROM users WHERE status = 'active'"
    );
    return result.rows;
  },
  getUserByEmail: async (email) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
      [email]
    );
    return result.rows[0];
  },
  getUserById: async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
  createUser: async (name, email) => {
    const result = await pool.query(
      "INSERT INTO users (name, email, status) VALUES ($1, $2, $3) RETURNING *",
      [name, email, "active"]
    );
    return result.rows[0];
  },
  updateUser: async (id, name, email) => {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    return result.rows[0];
  },
  changeUserStatus: async (id, status) => {
    const result = await pool.query(
      "UPDATE users SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return result.rows[0];
  },
  deleteUser: async (id) => {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  },
};
