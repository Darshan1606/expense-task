const expenseCategoryModel = require("../models/expenseCategoryModel");

module.exports = {
  getAllExpenseCategory: async () => {
    try {
      const data = await expenseCategoryModel.getAll();
      if (!data || data.length === 0) {
        throw new Error("No expense categories found");
      }
      return data;
    } catch (error) {
      console.error("getAllExpenseCategory Error:", error.message);
      throw new Error("Failed to retrieve expense categories");
    }
  },

  getAllExpenseCategoryOptions: async () => {
    try {
      const data = await expenseCategoryModel.getAllOptions();
      if (!data || data.length === 0) {
        throw new Error("No expense category options found");
      }
      return data;
    } catch (error) {
      console.error("getAllExpenseCategoryOptions Error:", error.message);
      throw new Error("Failed to retrieve expense category options");
    }
  },

  addExpenseCategory: async (data) => {
    try {
      const expenseCategory = await expenseCategoryModel.createExpenseCategory(
        data.name
      );
      if (!expenseCategory) {
        throw new Error("Failed to create expense category");
      }
      return expenseCategory;
    } catch (error) {
      console.error("addExpenseCategory Error:", error.message);
      throw new Error("Failed to add expense category");
    }
  },

  findExpenseCategoryById: async (id) => {
    try {
      const expenseCategory = await expenseCategoryModel.getExpenseCategoryById(
        id
      );
      if (!expenseCategory) {
        throw new Error("Expense category not found");
      }
      return expenseCategory;
    } catch (error) {
      console.error("findExpenseCategoryById Error:", error.message);
      throw new Error("Failed to find expense category by ID");
    }
  },

  editExpenseCategory: async (id, data) => {
    try {
      const expenseCategory = await expenseCategoryModel.updateExpenseCategory(
        id,
        data.name
      );
      if (!expenseCategory) {
        throw new Error("Failed to update expense category");
      }
      return expenseCategory;
    } catch (error) {
      console.error("editExpenseCategory Error:", error.message);
      throw new Error("Failed to edit expense category");
    }
  },

  deleteExpenseCategory: async (id) => {
    try {
      const result = await expenseCategoryModel.deleteExpenseCategory(id);
      if (!result) {
        throw new Error("Failed to delete expense category");
      }
      return result;
    } catch (error) {
      console.error("deleteExpenseCategory Error:", error.message);
      throw new Error("Failed to delete expense category");
    }
  },
};
