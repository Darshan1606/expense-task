import api from "./api";

export const getTopDaysExpense = async (user) => {
  return await api.get(`/dashboard/top-days/${user}`);
};

export const getPercentages = async () => {
  return await api.get(`/dashboard/percentage-change`);
};

export const getNextMonthAmount = async () => {
  return await api.get(`/dashboard/next-month-prediction`);
};
