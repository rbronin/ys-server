const UserDB = require("../db/user");
const { hashPassword, comparePassword } = require("../utils");
const { APP } = require("../config");
const Jwt = require("jsonwebtoken");

const addNewUser = async (req, res) => {
  let newUser = req.body;
  let encryptedPassword = await hashPassword(newUser.password);
  newUser.password = encryptedPassword;
  const result = await UserDB.createUser(newUser).catch((err) => {
    res.status(400).json({
      error: err.message,
    });
  });
  if (result) {
    result.password = undefined;
    return res.status(200).json({
      message: "Signup Successfully",
      data: result,
    });
  } else
    return res.status(400).json({
      error: "Some error occured",
    });
};

const loginUser = async (req, res, next) => {
  let user = req.body;
  let foundUser = await UserDB.getUserByEmail(user.email);
  if (!foundUser) return res.status(404).json({ message: "No user found" });
  else {
    let result = await comparePassword(user.password, foundUser.password);
    if (result) {
      req.user = foundUser;
      return next();
    } else {
      return res.status(404).json({
        message: "Invalid user",
      });
    }
  }
};

const generateLoginCredential = (req, res) => {
  const { _id, email } = req.user;
  Jwt.sign(
    { _id, email },
    APP.SECRET,
    { algorithm: "HS512", expiresIn: "5h" },
    (err, token) => {
      if (err)
        return res.status(400).json({
          error: err.message,
        });
      return res.status(200).json({
        message: "Signin successfully",
        data: {
          auth_token: token,
        },
      });
    },
  );
};

// eslint-disable-next-line no-unused-vars
const varifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(400).json({ error: "Auth token is required" });
  const token = header.split(" ")[1];
  if (!token) return res.status(400).json({ error: "Invalid token" });
  // eslint-disable-next-line no-unused-vars
  Jwt.verify(token, APP.SECRET, { algorithms: "HS512" }, (err, _decoded) => {
    if (err)
      return res.status(400).json({
        isValid: false,
      });
    return res.status(200).json({
      isValid: true,
    });
  });
};

const isValidToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(400).json({ error: "Auth token is required" });
  const token = header.split(" ")[1];
  if (!token) return res.status(400).json({ error: "Invalid token" });
  Jwt.verify(token, APP.SECRET, { algorithms: "HS512" }, (err, decoded) => {
    if (err)
      return res.status(400).json({
        error: err.message,
      });
    req.user = decoded;
    return next();
  });
};

module.exports = {
  addNewUser,
  loginUser,
  generateLoginCredential,
  varifyToken,
  isValidToken,
};
