const schema = require("../schema/user");

const validateSignupReq = async (req, res, next) => {
  let user = req.body;

  const { error, value } = await schema.userSchema.validate(user);
  if (error)
    return res.status(400).json({
      error: error.message,
    });
  if (value) return next();
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

module.exports = {
  validateSignupReq,
  validateLoginReq,
};
