/**
 * @author Ravi Bharti
 ** @description - authentication routes
 */

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
const {
  isUserExist,
  isLogin,
  isAuthenticated,
  isVerified,
} = require("../middlewares/mdl.auth");
const {
  registerController,
  loginController,
} = require("../controllers/ctrl.auth");

/**
 * @method - Post
 * @param - /register & /login
 * @description  - User signup and login method
 **/

router.post(
  "/register",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("username", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  isUserExist,
  registerController
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 4 }),
  ],
  loginController
);

router.get("/me", isLogin, isVerified, isAuthenticated, (req, res) => {
  res.json({
    user: req.user,
    message: "you got it",
  });
});

router.post("/validate/token", async (req, res) => {
  try {
    // const token = req.header("x-auth-token");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.LOGIN_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified._id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
