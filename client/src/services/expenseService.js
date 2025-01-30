import api from "./api";

export const getAllExpenses = async (data) => {
  return await api.post("/expense/get-all", data);
};

export const addExpense = async (data) => {
  return await api.post("/expense/add", data);
};

export const updateExpense = async (id, data) => {
  return await api.put(`/expense/update/${id}`, data);
};

export const deleteExpense = async (id) => {
  return await api.delete(`/expense/delete/${id}`);
};

export const getAllConfig = async () => {
  return await api.get(`/expense/get-all-config`);
};
