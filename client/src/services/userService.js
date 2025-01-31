import api from "./api";

export const getAllUsers = async (data, page, pageSize) => {
  return await api.get(`/user/get-all?page=${page}&pageSize=${pageSize}`, data);
};

export const addUser = async (data) => {
  return await api.post("/user/add", data);
};

export const updateUser = async (id, data) => {
  return await api.put(`/user/update/${id}`, data);
};

export const changeUserStatus = async (id, data) => {
  return await api.put(`/user/change-status/${id}`, data);
};

export const deleteUser = async (id) => {
  return await api.delete(`/user/delete/${id}`);
};
