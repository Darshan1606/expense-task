const {
  getTopSpendingDays,
  getPercentageChange,
  getNextMonthPrediction,
} = require("../services/dashboardService");

module.exports = {
  getTopSpendingDays: async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const data = await getTopSpendingDays(user_id);

      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No spending data found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully retrieved top spending days",
        data: data,
      });
    } catch (error) {
      console.error("getTopSpendingDays Error:", error.message);
      next(error);
    }
  },

  getPercentageChange: async (req, res, next) => {
    try {
      const data = await getPercentageChange();

      if (data?.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No data found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully retrieved percentage change data",
        data: data,
      });
    } catch (error) {
      console.error("getPercentageChange Error:", error.message);
      next(error);
    }
  },

  getNextMonthPrediction: async (req, res, next) => {
    try {
      const data = await getNextMonthPrediction();

      if (data?.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No prediction data found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Successfully retrieved next month prediction",
        data: data,
      });
    } catch (error) {
      console.error("getNextMonthPrediction Error:", error.message);
      next(error);
    }
  },
};
