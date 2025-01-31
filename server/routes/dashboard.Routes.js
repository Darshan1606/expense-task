const express = require("express");
const {
  getTopSpendingDays,
  getPercentageChange,
  getNextMonthPrediction,
} = require("../controller/dashboardController");
const router = express.Router();

router.get("/top-days/:user_id", getTopSpendingDays);
router.get("/percentage-change", getPercentageChange);
router.get("/next-month-prediction", getNextMonthPrediction);

module.exports = router;
