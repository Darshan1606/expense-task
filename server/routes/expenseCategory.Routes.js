const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { ValidateBody } = require("../validations/user.validation");
const { expenseCategorySchema } = require("../validations/validation.schema");
const {
  getAllExpenseCategory,
  addExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
} = require("../controller/expenseCategoryController");

router.get("/get-all", authenticateToken, getAllExpenseCategory);
router.post(
  "/add",
  authenticateToken,
  ValidateBody(expenseCategorySchema),
  addExpenseCategory
);
router.put(
  "/update/:id",
  authenticateToken,
  ValidateBody(expenseCategorySchema),
  updateExpenseCategory
);
router.delete("/delete/:id", authenticateToken, deleteExpenseCategory);

module.exports = router;
