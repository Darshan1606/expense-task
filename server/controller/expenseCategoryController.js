const {
  getAllExpenseCategory,
  addExpenseCategory,
  findExpenseCategoryById,
  editExpenseCategory,
  deleteExpenseCategory,
} = require("../services/expenseCategoryService");

module.exports = {
  getAllExpenseCategory: async (req, res, next) => {
    try {
      const expenseCategory = await getAllExpenseCategory();
      if (expenseCategory.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No expense categories found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully retrieved all expense categories",
        data: expenseCategory,
      });
    } catch (error) {
      console.error("getAllExpenseCategory Error:", error.message);
      next(error);
    }
  },

  addExpenseCategory: async (req, res, next) => {
    try {
      const expenseCategory = await addExpenseCategory(req.body);

      res.status(201).json({
        success: true,
        message: "Expense category added successfully",
        result: {
          expense_category_name: expenseCategory.expense_category_name,
          id: expenseCategory.id,
        },
      });
    } catch (error) {
      console.error("addExpenseCategory Error:", error.message);
      next(error);
    }
  },

  updateExpenseCategory: async (req, res, next) => {
    try {
      let isExists = await findExpenseCategoryById(req.params.id);

      if (isExists) {
        const expenseCategory = await editExpenseCategory(
          req.params.id,
          req.body
        );

        res.status(200).json({
          success: true,
          message: "Expense category updated successfully",
          result: {
            expense_category_name: expenseCategory.expense_category_name,
            id: expenseCategory.id,
          },
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Expense category not found",
        });
      }
    } catch (error) {
      console.error("updateExpenseCategory Error:", error.message);
      next(error);
    }
  },

  deleteExpenseCategory: async (req, res, next) => {
    try {
      let isExists = await findExpenseCategoryById(req.params.id);

      if (isExists) {
        await deleteExpenseCategory(req.params.id);

        res.status(200).json({
          success: true,
          message: "Expense category deleted successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Expense category not found",
        });
      }
    } catch (error) {
      console.error("deleteExpenseCategory Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
      next(error);
    }
  },
};
