const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 25,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      lowercase: true,
      min: 4,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.index({ name: 1 });

module.exports = mongoose.model("User", userSchema);
