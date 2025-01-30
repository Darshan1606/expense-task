const expenseCategoryModel = require("../models/expenseCategoryModel");

module.exports = {
  getAllExpenseCategory: async () => {
    return await expenseCategoryModel.getAll();
  },
  getAllExpenseCategoryOptions: async () => {
    return await expenseCategoryModel.getAllOptions();
  },
  addExpenseCategory: async (data) => {
    return await expenseCategoryModel.createExpenseCategory(data.name);
  },
  findExpenseCategoryById: async (id) => {
    return await expenseCategoryModel.getExpenseCategoryById(id);
  },
  editExpenseCategory: async (id, data) => {
    return await expenseCategoryModel.updateExpenseCategory(id, data.name);
  },
  deleteExpenseCategory: async (id) => {
    return await expenseCategoryModel.deleteExpenseCategory(id);
  },
};
