const pool = require("../config/db");

module.exports = {
  getAll: async () => {
    const result = await pool.query(
      "SELECT * FROM categories ORDER BY id DESC"
    );
    return result.rows;
  },
  getAllOptions: async () => {
    const result = await pool.query(
      "SELECT id AS value, name AS label FROM categories ORDER BY id DESC"
    );
    return result.rows;
  },
  getExpenseCategoryById: async (id) => {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },
  createExpenseCategory: async (name) => {
    const result = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    return result.rows[0];
  },
  updateExpenseCategory: async (id, name) => {
    const result = await pool.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return result.rows[0];
  },
  deleteExpenseCategory: async (id) => {
    const result = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};
