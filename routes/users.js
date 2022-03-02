const express = require("express");
const {
  getProfile,
  getUserById,
  userRecommendation,
  addFollower,
  addToCollections,
  fetchCollections,
  fetchFriends,
  searchUser,
} = require("../controllers/user.ctlr");
const { isValidToken } = require("../controllers/auth.ctr");
const userRoute = express.Router();

userRoute.use(isValidToken);
userRoute.get("/", getUserById);
userRoute.get("/recommend", userRecommendation);

userRoute.get("/profile", getProfile);
userRoute.post("/follow", addFollower);
userRoute.post("/collections/:itemid", addToCollections);
userRoute.get("/collections", fetchCollections);
userRoute.get("/friends", fetchFriends);
userRoute.get("/search", searchUser);

module.exports = userRoute;
