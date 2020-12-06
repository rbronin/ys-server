/**
 *  @author - Ravi Bharti
 * * @method Authentication-controller
 ** @description - register and login methods
 *
 */
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

/**
 *
 ** @param {*register Controller} req
 ** @param {*} res
 */

const registerController = async (req, res) => {
  //handle request validation error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  //register new user
  const body = req.body;
  const newUser = new User(body);
  await newUser.save((err, user) => {
    if (err)
      return res
        .status(400)
        .json({ err: err.message, message: "unable to save user" });
    user.password = undefined;
    res.json({
      message: "User Registration success",
      user: user,
    });
  });
};

/**
 ** @param {*login Controller} req
 ** @param {*} res
 */

const loginController = async (req, res) => {
  //handle request validation error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //login user
  const { email, password } = req.body;
  await User.findOne({ email }, async (err, user) => {
    if (err || !user)
      return res.status(404).json({ err: err, message: "user not found" });
    try {
      //validate user password
      const validate = await user.isValidPassword(password);
      if (!validate)
        return res.status(400).json({ message: "incorrect password" });
      //generate auth token
      const token = jwt.sign({ _id: user._id }, process.env.LOGIN_SECRET, {
        expiresIn: "1days",
      });
      res.cookie("token", token, { expire: new Date() + 9999 });
      const { _id, name, email, username } = user;
      return res.json({ token: token, user: { _id, name, username, email } });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `some err ${e.message}` });
    }
  });
};

module.exports = { registerController, loginController };
