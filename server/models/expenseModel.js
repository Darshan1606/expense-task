const pool = require("../config/db");

module.exports = {
  getAll: async (
    { user_id, category_id, fromDate, toDate },
    page,
    pageSize
  ) => {
    try {
      let query = `
        SELECT 
          expenses.id, 
          expenses.amount, 
          expenses.date, 
          expenses.description,
          users.id AS user_id,
          users.name AS user_name, 
          users.email AS user_email, 
          categories.id AS category_id,
          categories.name AS category_name
        FROM expenses
        JOIN users ON expenses.user_id = users.id
        JOIN categories ON expenses.category_id = categories.id
      `;

      let countQuery = `SELECT COUNT(*) FROM expenses JOIN users ON expenses.user_id = users.id JOIN categories ON expenses.category_id = categories.id`;

      let conditions = [];
      let values = [];

      if (user_id) {
        values.push(user_id);
        conditions.push(`user_id = $${values.length}`);
      }

      if (category_id) {
        values.push(category_id);
        conditions.push(`category_id = $${values.length}`);
      }

      if (fromDate) {
        values.push(fromDate);
        conditions.push(`date >= $${values.length}`);
      }

      if (toDate) {
        values.push(toDate);
        conditions.push(`date <= $${values.length}`);
      }

      // If conditions exist, add WHERE clause
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
        countQuery += " WHERE " + conditions.join(" AND ");
      }

      query += " ORDER BY id DESC";

      // Pagination logic
      const offset = (page - 1) * pageSize;
      values.push(pageSize, offset);
      query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

      // Execute queries
      const [dataResult, countResult] = await Promise.all([
        pool.query(query, values),
        pool.query(countQuery, values.slice(0, -2)), // Count query doesn't need LIMIT/OFFSET
      ]);

      const totalRecords = parseInt(countResult.rows[0].count, 10);

      return {
        data: dataResult.rows,
        pagination: {
          totalRecords,
          currentPage: page,
          pageSize,
        },
      };
    } catch (error) {
      console.error("Error querying expenses:", error.message);
      throw new Error("Database query failed");
    }
  },

  getExpenseById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM expenses WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null; // Return null if no row is found
    } catch (error) {
      console.error(`Error querying expense by id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },

  createExpense: async ({
    user_id,
    category_id,
    amount,
    date,
    description,
  }) => {
    try {
      const result = await pool.query(
        "INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, category_id, amount, date, description]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error inserting expense:", error.message);
      throw new Error("Database query failed");
    }
  },

  updateExpense: async (
    id,
    { user_id, category_id, amount, date, description }
  ) => {
    try {
      const result = await pool.query(
        `UPDATE expenses 
         SET user_id = $1, category_id = $2, amount = $3, date = $4, description = $5 
         WHERE id = $6 
         RETURNING *`,
        [user_id, category_id, amount, date, description, id]
      );
      return result.rows[0] || null; // Return null if no row is updated
    } catch (error) {
      console.error(`Error updating expense with id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },

  deleteExpense: async (id) => {
    try {
      const result = await pool.query(
        "DELETE FROM expenses WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rows[0] || null; // Return null if no row is deleted
    } catch (error) {
      console.error(`Error deleting expense with id ${id}:`, error.message);
      throw new Error("Database query failed");
    }
  },
};
