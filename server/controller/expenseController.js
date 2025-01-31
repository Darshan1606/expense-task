const {
  getAllExpenseCategoryOptions,
} = require("../services/expenseCategoryService");
const {
  getAllExpenseService,
  addExpenseService,
  findExpenseByIdService,
  editExpenseService,
  deleteExpenseService,
} = require("../services/expenseService");
const { getAllActiveUsers } = require("../services/userService");

module.exports = {
  getAllExpense: async (req, res, next) => {
    try {
      const { user, category, fromDate, toDate } = req.body;
      const page = req.query.page ? Number(req.query.page) : 1;
      const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

      const expense = await getAllExpenseService(
        {
          user_id: user,
          category_id: category,
          fromDate,
          toDate,
        },
        page,
        pageSize
      );

      res.status(200).json({
        success: true,
        message: "Retrieved all expenses successfully",
        data: expense.data,
        pagination: expense.pagination,
      });
    } catch (error) {
      console.error("getAllExpense Error:", error.message);
      next(error);
    }
  },

  getAllConfig: async (req, res, next) => {
    try {
      const users = await getAllActiveUsers();
      const categories = await getAllExpenseCategoryOptions();

      res.status(200).json({
        success: true,
        message: "Successfully retrieved all configuration data",
        data: {
          users,
          categories,
        },
      });
    } catch (error) {
      console.error("getAllConfig Error:", error.message);
      next(error);
    }
  },

  addExpense: async (req, res, next) => {
    try {
      const expense = await addExpenseService(req.body);

      res.status(201).json({
        success: true,
        message: "Expense added successfully",
        result: {
          name: expense.name,
          id: expense.id,
        },
      });
    } catch (error) {
      console.error("addExpense Error:", error.message);
      next(error);
    }
  },

  updateExpense: async (req, res, next) => {
    try {
      const expense = await findExpenseByIdService(req.params.id);

      if (expense) {
        const updatedExpense = await editExpenseService(
          req.params.id,
          req.body
        );

        res.status(200).json({
          success: true,
          message: "Expense updated successfully",
          result: {
            name: updatedExpense.name,
            id: updatedExpense.id,
          },
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Expense not found",
        });
      }
    } catch (error) {
      console.error("updateExpense Error:", error.message);
      next(error);
    }
  },

  deleteExpense: async (req, res, next) => {
    try {
      const expense = await findExpenseByIdService(req.params.id);

      if (expense) {
        await deleteExpenseService(req.params.id);

        res.status(200).json({
          success: true,
          message: "Expense deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Expense not found",
        });
      }
    } catch (error) {
      console.error("deleteExpense Error:", error.message);
      next(error);
    }
  },
};
