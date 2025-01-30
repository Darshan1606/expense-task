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
      const { user_id, category_id, fromDate, toDate } = req.body;
      const expense = await getAllExpenseService({
        user_id,
        category_id,
        fromDate,
        toDate,
      });
      res.json({
        success: true,
        message: "get all expense categories successfully",
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllConfig: async (req, res, next) => {
    try {
      const users = await getAllActiveUsers();
      const categories = await getAllExpenseCategoryOptions();

      res.json({
        success: true,
        message: "get all config successfully",
        data: {
          users,
          categories,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  addExpense: async (req, res, next) => {
    try {
      const expense = await addExpenseService(req.body);

      res.json({
        success: true,
        message: "add expense  successfully",
        result: {
          name: expense.name,
          id: expense.id,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  updateExpense: async (req, res, next) => {
    try {
      let isExists = await findExpenseByIdService(req.params.id);

      if (isExists) {
        const expense = await editExpenseService(req.params.id, req.body);

        res.json({
          success: true,
          message: "edit expense  successfully",
          result: {
            expense__name: expense.expense__name,
            _id: expense._id,
          },
        });
      } else {
        res.json({
          success: false,
          message: "expense  not found",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  deleteExpense: async (req, res, next) => {
    try {
      let isExists = await findExpenseByIdService(req.params.id);

      if (isExists) {
        await deleteExpenseService(req.params.id);

        res.json({
          success: true,
          message: "delete expense  successfully",
        });
      } else {
        res.json({
          success: false,
          message: "expense  not found",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
