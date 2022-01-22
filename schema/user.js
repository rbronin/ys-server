const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(4).max(25).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  username: Joi.string().alphanum().min(3).max(30),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  userSchema,
  loginSchema,
};
