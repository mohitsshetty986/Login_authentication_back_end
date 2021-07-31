const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("email").normalizeEmail().isEmail().withMessage("Invalid email!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is empty!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be within 8 to 20 characters!"),
  //   check("confirmPassword")
  //     .trim()
  //     .not()
  //     .isEmpty()
  //     .custom((value, { req }) => {
  //       if (value !== req.body.password) {
  //         throw new Error("Both Password must be same!");
  //       }
  //       return true;
  //     }),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check("email").trim().isEmail().withMessage("email/password is required!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email/password is required!"),
];
