const { User, WpToken, Setting } = require("../Models");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
var fs = require("fs");
const { body, validationResult } = require("express-validator");
const uniqid = require("uniqid");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");
const config = require("../config/config.json");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const Req = req.body;
    // const profile_pic_file = req?.files?.profile_pic || null;
    const salt = genSaltSync(10);
    const password = hashSync(Req.password, salt);

    // const dir = "./uploads/profilepic";

    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir, { recursive: true });
    // }

    // const profile_pic = profile_pic_file
    //   ? "profilepic/" + uniqid() + profile_pic_file.name
    //   : null;
    // if (profile_pic_file) {
    //   profile_pic_file.mv("./uploads/" + profile_pic);
    // }

    const user = await User.create({
      userType: "User",
      email: Req.email,
      firstName: Req.firstName,
      lastName: Req.lastName,
      password: password,
      profilePic: null,
      phone: Req.phone,
    });

    return res.json({
      meta: {
        message: "User has been created.",
        code: 200,
      },
      user,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const login = async (req, res) => {
  try {
    const Req = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({ where: { email: Req.email } });

    if (!user) {
      return res.status(404).json({
        errors: [
          {
            code: 404,
            msg: "User not found",
          },
        ],
      });
    }

    if (!compareSync(Req.password, user.password)) {
      return res.status(401).json({
        errors: [
          {
            code: 401,
            msg: "Password Incorrect!",
          },
        ],
      });
    }

    if (user && user.status == 0) {
      return res.status(403).json({
        errors: [
          {
            code: 403,
            msg: "User has been not active. please contact customer support.",
          },
        ],
      });
    }

    const token = sign(
      { email: Req.email, password: Req.password },
      config.databasename,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      meta: {
        message: "Login Successfully.",
        code: 200,
      },
      token: token,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      errors: [
        {
          value: "",
          msg: err.message,
          param: "",
          location: "body",
        },
      ],
    });
  }
};

const validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("email")
          .bail()
          .notEmpty()
          .withMessage("Email must be required.")
          .isEmail()
          .withMessage("Please enter valid email.")
          .custom(async (value) => {
            return await User.findOne({ where: { email: value } }).then(
              (user) => {
                if (user) {
                  return Promise.reject(
                    "Email address already taken, please use another email address."
                  );
                }
              }
            );
          }),
        body("firstName")
          .notEmpty()
          .withMessage("First name must be required."),
        body("lastName").notEmpty().withMessage("Last name must be required."),
        body("password").notEmpty().withMessage("Password must be required."),
        body("phone")
          .bail()
          .notEmpty()
          .withMessage("Mobile number must be required.")
          .isNumeric()
          .withMessage("Please enter valid phone number.")
          .custom(async (value) => {
            return await User.findOne({ where: { phone: value } }).then(
              (user) => {
                if (user) {
                  return Promise.reject(
                    "Phone number already taken, please use another phone number."
                  );
                }
              }
            );
          }),
      ];
    }

    case "login": {
      return [
        body("email").bail().notEmpty().withMessage("Email must be required."),
        body("password").notEmpty().withMessage("Password must be required."),
      ];
    }
  }
};

module.exports = {
  createUser,
  login,
  validate,
};
