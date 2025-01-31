const pool = require("../config/db");

module.exports = {
  getTopDaysSpending: async (user_id) => {
    try {
      const result = await pool.query(
        `SELECT 
          e.id AS expense_id,
          e.user_id,
          u.name AS user_name,
          e.amount,
          e.date,
          e.description,
          c.name AS category_name
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        JOIN categories c ON e.category_id = c.id
        WHERE e.user_id = $1
        ORDER BY e.amount DESC
        LIMIT 3;`,
        [user_id]
      );
      return result.rows;
    } catch (error) {
      console.error("🔥 Error fetching top spending days:", error);
      throw new Error("Database query failed");
    }
  },
  getPercentageChange: async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
      const previousMonth = new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      )
        .toISOString()
        .slice(0, 7);

      const currentMonthQuery = `
        SELECT 
          e.user_id, 
          u.name AS user_name,
          u.email AS user_email,
          SUM(e.amount) AS current_month_total
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        WHERE DATE_TRUNC('month', e.date) = DATE_TRUNC('month', $1::date)
        GROUP BY e.user_id, u.name, u.email
      `;

      const previousMonthQuery = `
        SELECT 
          e.user_id, 
          u.name AS user_name,
          u.email AS user_email,
          SUM(e.amount) AS previous_month_total
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        WHERE DATE_TRUNC('month', e.date) = DATE_TRUNC('month', $1::date)
        GROUP BY e.user_id, u.name, u.email
      `;

      const [currentMonthResults, previousMonthResults] = await Promise.all([
        pool.query(currentMonthQuery, [`${currentMonth}-01`]), // Use the exact first day of the month
        pool.query(previousMonthQuery, [`${previousMonth}-01`]), // Same for previous month
      ]);

      const currentMonthData = currentMonthResults.rows;
      const previousMonthData = previousMonthResults.rows;

      const mergedData = currentMonthData.map((current) => {
        const previous = previousMonthData.find(
          (p) => p.user_id === current.user_id
        );
        const percentageChange = previous
          ? ((current.current_month_total - previous.previous_month_total) /
              previous.previous_month_total) *
            100
          : null; // If previous data is missing, set to null

        return {
          user_id: current.user_id,
          user_name: current.user_name,
          user_email: current.user_email,
          current_month_total: current.current_month_total,
          previous_month_total: previous ? previous.previous_month_total : 0,
          percentage_change: percentageChange,
        };
      });

      return mergedData;
    } catch (error) {
      console.error("🔥 Error fetching percentage change:", error);
      throw new Error("Database query failed");
    }
  },
  getNextMonthPrediction: async () => {
    try {
      const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
      const previousMonth = new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      )
        .toISOString()
        .slice(0, 7);
      const monthBeforeLast = new Date(
        new Date().setMonth(new Date().getMonth() - 2)
      )
        .toISOString()
        .slice(0, 7);

      // Query to calculate total expenses for the last 3 months
      const last3MonthsQuery = `
        SELECT 
          e.user_id, 
          u.name AS user_name,
          u.email AS user_email,
          SUM(CASE WHEN DATE_TRUNC('month', e.date) = DATE_TRUNC('month', $1::date) THEN e.amount ELSE 0 END) AS month_1_total,
          SUM(CASE WHEN DATE_TRUNC('month', e.date) = DATE_TRUNC('month', $2::date) THEN e.amount ELSE 0 END) AS month_2_total,
          SUM(CASE WHEN DATE_TRUNC('month', e.date) = DATE_TRUNC('month', $3::date) THEN e.amount ELSE 0 END) AS month_3_total
        FROM expenses e
        JOIN users u ON e.user_id = u.id
        WHERE DATE_TRUNC('month', e.date) IN ($1::date, $2::date, $3::date)
        GROUP BY e.user_id, u.name, u.email
      `;

      // Pass the first day of the last 3 months as date parameters
      const result = await pool.query(last3MonthsQuery, [
        `${currentMonth}-01`,
        `${previousMonth}-01`,
        `${monthBeforeLast}-01`,
      ]);

      if (!result || !Array.isArray(result.rows)) {
        throw new Error("Unexpected result format or empty result set");
      }
      // Calculate average spending for each user over the last 3 months
      const predictions = result.rows.map((row) => {
        const {
          user_id,
          user_name,
          user_email,
          month_1_total,
          month_2_total,
          month_3_total,
        } = row;

        const totalExpenses = [
          month_1_total || 0,
          month_2_total || 0,
          month_3_total || 0,
        ];

        const validExpenses = totalExpenses.filter((expense) => expense > 0);
        const averageExpense =
          validExpenses.length > 0
            ? validExpenses
                .map((amount) => parseFloat(amount)) // Convert string values to numbers
                .reduce((sum, amount) => sum + amount, 0) / validExpenses.length
            : 0;

        return {
          user_id,
          user_name,
          user_email,
          predicted_next_month_total: Math.ceil(averageExpense),
        };
      });

      return predictions;
    } catch (error) {
      console.error("🔥 Error predicting next month's total expense:", error);
      throw new Error("Database query failed");
    }
  },
};
