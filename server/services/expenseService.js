const expenseModel = require("../models/expenseModel");

module.exports = {
  getAllExpenseService: async (data, page, pageSize) => {
    try {
      const expenses = await expenseModel.getAll(data, page, pageSize);
      if (!expenses || expenses.length === 0) {
        throw new Error("No expenses found");
      }
      return expenses;
    } catch (error) {
      console.error("getAllExpenseService Error:", error.message);
      throw new Error("Failed to retrieve expenses");
    }
  },

  addExpenseService: async (data) => {
    try {
      const expense = await expenseModel.createExpense(data);
      if (!expense) {
        throw new Error("Failed to add expense");
      }
      return expense;
    } catch (error) {
      console.error("addExpenseService Error:", error.message);
      throw new Error("Failed to add expense");
    }
  },

  findExpenseByIdService: async (id) => {
    try {
      const expense = await expenseModel.getExpenseById(id);
      if (!expense) {
        throw new Error("Expense not found");
      }
      return expense;
    } catch (error) {
      console.error("findExpenseByIdService Error:", error.message);
      throw new Error("Failed to retrieve expense by ID");
    }
  },

  editExpenseService: async (id, data) => {
    try {
      const expense = await expenseModel.updateExpense(id, data);
      if (!expense) {
        throw new Error("Failed to update expense");
      }
      return expense;
    } catch (error) {
      console.error("editExpenseService Error:", error.message);
      throw new Error("Failed to update expense");
    }
  },

  deleteExpenseService: async (id) => {
    try {
      const result = await expenseModel.deleteExpense(id);
      if (!result) {
        throw new Error("Failed to delete expense");
      }
      return result;
    } catch (error) {
      console.error("deleteExpenseService Error:", error.message);
      throw new Error("Failed to delete expense");
    }
  },
};
