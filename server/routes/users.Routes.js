const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { ValidateBody } = require("../validations/user.validation");
const {
  userSchema,
  changeUserStatusSchema,
} = require("../validations/validation.schema");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  changeUserStatus,
} = require("../controller/userController");

router.get("/get-all", authenticateToken, getAllUsers);
router.post("/add", authenticateToken, ValidateBody(userSchema), addUser);
router.put(
  "/update/:id",
  authenticateToken,
  ValidateBody(userSchema),
  updateUser
);
router.put(
  "/change-status/:id",
  authenticateToken,
  ValidateBody(changeUserStatusSchema),
  changeUserStatus
);
router.delete("/delete/:id", authenticateToken, deleteUser);

module.exports = router;
