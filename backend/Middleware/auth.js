const { verify } = require("jsonwebtoken");
const { User } = require("../Models");
const config = require("../config/config.json");

module.exports = {
  auth: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, config.databasename, async (error, decoded) => {
        if (error) {
          res.json({
            success: false,
            message: "Invalid token",
          });
        } else {
          const user = await User.findOne({
            where: { email: decoded.email },
          });
          req.Auth = user;
          next();
        }
      });
    } else {
      res.json({
        success: false,
        message: "Access denied! unauthorized user",
      });
    }
  },
};
