const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { ValidateBody } = require("../validations/user.validation");
const {
  expenseSchema,
  expenseFilterSchema,
} = require("../validations/validation.schema");
const {
  getAllExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  getAllConfig,
} = require("../controller/expenseController");

router.post(
  "/get-all",
  ValidateBody(expenseFilterSchema),
  authenticateToken,
  getAllExpense
);
router.get("/get-all-config", authenticateToken, getAllConfig);
router.post("/add", authenticateToken, ValidateBody(expenseSchema), addExpense);
router.put(
  "/update/:id",
  authenticateToken,
  ValidateBody(expenseSchema),
  updateExpense
);
router.delete("/delete/:id", authenticateToken, deleteExpense);

module.exports = router;
