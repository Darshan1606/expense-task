const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants/env.constant");

module.exports = {
  authenticateToken: (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length); // Remove "Bearer " from the token string
    }

    if (token == null)
      return res.json({
        success: false,
        isAuth: false,
        message: "Token not found",
      });

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.json({
          success: false,
          isAuth: false,
          message: "Token is expired or Invalid token",
        });
      }

      req.user = user;
      next();
    });
  },
};
