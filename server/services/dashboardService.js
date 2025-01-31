const dashboardModel = require("../models/dashboardModel");

module.exports = {
  getTopSpendingDays: async (user_id) => {
    try {
      const data = await dashboardModel.getTopDaysSpending(user_id);
      if (!data || data.length === 0) {
        throw new Error("No top spending days data found");
      }
      return data;
    } catch (error) {
      console.error("getTopSpendingDays Error:", error.message);
      throw new Error("Failed to retrieve top spending days");
    }
  },

  getPercentageChange: async () => {
    try {
      const data = await dashboardModel.getPercentageChange();
      if (!data || data.length === 0) {
        throw new Error("No percentage change data found");
      }
      return data;
    } catch (error) {
      console.error("getPercentageChange Error:", error.message);
      throw new Error("Failed to retrieve percentage change data");
    }
  },

  getNextMonthPrediction: async () => {
    try {
      const data = await dashboardModel.getNextMonthPrediction();
      if (!data || data.length === 0) {
        throw new Error("No prediction data found for next month");
      }
      return data;
    } catch (error) {
      console.error("getNextMonthPrediction Error:", error.message);
      throw new Error("Failed to retrieve next month prediction");
    }
  },
};
