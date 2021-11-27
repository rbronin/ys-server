const schema = require("../schema/user");
const userDB = require("../db/user");

const validateSignupReq = (req, res, next) => {
  let user = req.body;
  // eslint-disable-next-line no-unused-vars
  const { error, value } = schema.userSchema.validate(user);
  if (error) {
    return res.status(400).json({
      error: error.message,
      message: error.details,
    });
  }
  return next();
};
const validateLoginReq = async (req, res, next) => {
  let user = req.body;

  const { error, value } = await schema.loginSchema.validate(user);
  if (error)
    return res.status(400).json({
      error: error.message,
    });
  if (value) return next();
};

const isUserExists = async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = await userDB.getUserByEmail(email).catch((err) => {
      return res.status(400).json({
        error: err.message,
      });
    });
    if (result) {
      return res.status(400).json({
        message: "User already exists",
      });
    } else {
      return next();
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  validateSignupReq,
  validateLoginReq,
  isUserExists,
};
