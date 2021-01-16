/**
 * @author Ravi Bharti
 ** @description - Authentication middlewares
 */
//

const jwt = require("jsonwebtoken");
const extrctJWT = require("express-jwt");
const User = require("../models/user");

//check for existing user
const isUserExist = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }, function (err, user) {
    if (user) return res.status(400).json({ message: "user alredy exist" });
    next();
  });
};

//is user login
const isLogin = extrctJWT({
  secret: process.env.LOGIN_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});
// is user authenticated
const isAuthenticated = (req, res, next) => {
  User.findById(req.auth._id, (err, user) => {
    if (err || !user)
      return res
        .status(404)
        .json({ message: `Unauthorization ${err.message}` });
    user.password = undefined;
    req.user = user;
    next();
  });
};

//verify token
const isVerified = (req, res, next) => {
  // console.log("is:", req.headers.authorization.split(" ")[0] === "Bearer");
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(404).json({ error: "invalid token" });
  jwt.verify(token, process.env.LOGIN_SECRET, function (err, decoded) {
    if (err) return res.json({ err: err.message });
    req.userid = decoded._id;
    next();
  });
};

//get user by Id
const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) return res.status(404).json({ message: err.message });
    req.profile = user;
    next();
  });
};

module.exports = {
  isUserExist,
  isLogin,
  isAuthenticated,
  isVerified,
  getUserById,
};
