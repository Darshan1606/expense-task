const pool = require("../config/db");

module.exports = {
  getAll: async () => {
    try {
      const result = await pool.query(
        "SELECT * FROM categories ORDER BY id DESC"
      );
      return result.rows;
    } catch (error) {
      console.error("Error querying categories:", error.message);
      throw new Error("Database query failed");
    }
  },

  getAllOptions: async () => {
    try {
      const result = await pool.query(
        "SELECT id AS value, name AS label FROM categories ORDER BY id DESC"
      );
      return result.rows;
    } catch (error) {
      console.error("Error querying categories options:", error.message);
      throw new Error("Database query failed");
    }
  },

  getExpenseCategoryById: async (id) => {
    try {
      const result = await pool.query(
        "SELECT * FROM categories WHERE id = $1",
        [id]
      );
      return result.rows[0] || null; // Return null if no row is found
    } catch (error) {
      console.error(`Error querying category by id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },

  createExpenseCategory: async (name) => {
    try {
      const result = await pool.query(
        "INSERT INTO categories (name) VALUES ($1) RETURNING *",
        [name]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting category:", error.message);
      throw new Error("Database query failed");
    }
  },

  updateExpenseCategory: async (id, name) => {
    try {
      const result = await pool.query(
        "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
      );
      return result.rows[0] || null; // Return null if no row is updated
    } catch (error) {
      console.error(`Error updating category with id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },

  deleteExpenseCategory: async (id) => {
    try {
      const result = await pool.query(
        "DELETE FROM categories WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0] || null; // Return null if no row is deleted
    } catch (error) {
      console.error(`Error deleting category with id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },
};
