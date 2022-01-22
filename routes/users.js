const express = require("express");
const {
  getProfile,
  getUserById,
  userRecommendation,
} = require("../controllers/user.ctlr");
const { isValidToken } = require("../controllers/auth.ctr");
const userRoute = express.Router();

userRoute.use(isValidToken);
userRoute.get("/", getUserById);
userRoute.get("/recommend", userRecommendation);

userRoute.get("/profile", getProfile);

module.exports = userRoute;
