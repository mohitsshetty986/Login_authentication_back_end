const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("User");

const jwt = require("jsonwebtoken");
const { jwtkey } = require("../keys");

const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middleware/validation/user");

router.post("/signup", validateUserSignUp, userValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", validateUserSignIn, userValidation, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email or password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Must provide email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Must provide email or password" });
  }
});

module.exports = router;
