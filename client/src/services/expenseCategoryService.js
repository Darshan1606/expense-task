import api from "./api";

export const getAllCategories = async (data) => {
  return await api.get("/expense-category/get-all", data);
};

export const addCategory = async (data) => {
  return await api.post("/expense-category/add", data);
};

export const updateCategory = async (id, data) => {
  return await api.put(`/expense-category/update/${id}`, data);
};

export const deleteCategory = async (id) => {
  return await api.delete(`/expense-category/delete/${id}`);
};
