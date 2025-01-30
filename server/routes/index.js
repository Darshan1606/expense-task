const authRoutes = require("./auth.Routes");
const expenseCategoryRoutes = require("./expenseCategory.Routes");
const userRoutes = require("./users.Routes");
const expenseRoutes = require("./expense.Routes");

module.exports = {
  // api routes
  apiRoutes: (app) => {
    app.use("/auth", authRoutes);
    app.use("/expense-category", expenseCategoryRoutes);
    app.use("/user", userRoutes);
    app.use("/expense", expenseRoutes);
  },
};
