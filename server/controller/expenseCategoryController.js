const {
  getAllExpenseCategoryService,
  addExpenseCategoryService,
  findExpenseCategoryByIdService,
  editExpenseCategoryService,
  deleteExpenseCategoryService,
} = require("../services/expenseCategoryService");

module.exports = {
  getAllExpenseCategory: async (req, res, next) => {
    try {
      const expenseCategory = await getAllExpenseCategoryService();
      res.json({
        success: true,
        message: "get all expense categories successfully",
        data: expenseCategory,
      });
    } catch (error) {
      next(error);
    }
  },
  addExpenseCategory: async (req, res, next) => {
    try {
      const expenseCategory = await addExpenseCategoryService(req.body);

      res.json({
        success: true,
        message: "add expense category successfully",
        result: {
          expense_category_name: expenseCategory.expense_category_name,
          id: expenseCategory.id,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  updateExpenseCategory: async (req, res, next) => {
    try {
      let isExists = await findExpenseCategoryByIdService(req.params.id);

      if (isExists) {
        const expenseCategory = await editExpenseCategoryService(
          req.params.id,
          req.body
        );

        res.json({
          success: true,
          message: "edit expense category successfully",
          result: {
            expense_category_name: expenseCategory.expense_category_name,
            id: expenseCategory.id,
          },
        });
      } else {
        res.json({
          success: false,
          message: "expense category not found",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  deleteExpenseCategory: async (req, res, next) => {
    try {
      let isExists = await findExpenseCategoryByIdService(req.params.id);

      if (isExists) {
        await deleteExpenseCategoryService(req.params.id);

        res.json({
          success: true,
          message: "delete expense category successfully",
        });
      } else {
        res.json({
          success: false,
          message: "expense category not found",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
