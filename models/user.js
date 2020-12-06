/**
 * @author Ravi Bharti
 ** @description user-schema
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    maxlength: 32,
  },
  username: {
    type: String,
    minlength: 3,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 4,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

/**
 * @method pre-hook-method
 ** @description - hash user password
 */
userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

/**
 *
 * @param {validate} password
 */

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
