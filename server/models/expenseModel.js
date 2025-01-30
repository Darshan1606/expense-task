const pool = require("../config/db");

module.exports = {
  getAll: async ({ user_id, category_id, fromDate, toDate }) => {
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
    }

    query += " ORDER BY id DESC";

    const result = await pool.query(query, values);
    return result.rows;
  },
  getExpenseById: async (id) => {
    const result = await pool.query("SELECT * FROM expenses WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },
  createExpense: async ({
    user_id,
    category_id,
    amount,
    date,
    description,
  }) => {
    const result = await pool.query(
      "INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, category_id, amount, date, description]
    );
    return result.rows[0];
  },
  updateExpense: async (id, name) => {
    const result = await pool.query(
      "UPDATE expenses SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return result.rows[0];
  },
  deleteExpense: async (id) => {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};
