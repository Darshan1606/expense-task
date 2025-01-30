const express = require("express");
const router = express.Router();
const { login } = require("../controller/authController");
const { ValidateBody } = require("../validations/user.validation");
const { loginSchema } = require("../validations/validation.schema");

router.post("/login", ValidateBody(loginSchema), login);

module.exports = router;
