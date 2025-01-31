const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_SECRET_KEY } = require("../constants/env.constant");
const { getAdminByEmail } = require("../services/adminService");

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };

      let existUser = await getAdminByEmail(user.email);

      if (!existUser) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }

      const passwordMatch = await bcrypt.compare(
        user.password,
        existUser.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      const accessToken = jwt.sign(user, JWT_SECRET_KEY, {
        expiresIn: "10h",
      });

      res.status(200).json({
        success: true,
        isAuth: true,
        message: "Logged in successfully",
        token: accessToken,
        result: {
          id: existUser._id,
          name: existUser.name,
          email: existUser.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error.message);
      next(error);
    }
  },
};
