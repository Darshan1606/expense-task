const expenseModel = require("../models/expenseModel");

module.exports = {
  getAllExpenseService: async (data) => {
    return await expenseModel.getAll(data);
  },
  addExpenseService: async (data) => {
    return await expenseModel.createExpense(data);
  },
  findExpenseByIdService: async (id) => {
    return await expenseModel.getExpenseById(id);
  },
  editExpenseService: async (id, data) => {
    return await expenseModel.updateExpense(id, data);
  },
  deleteExpenseService: async (id) => {
    return await expenseModel.deleteExpense(id);
  },
};
