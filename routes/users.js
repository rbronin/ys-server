/**
 * @author Ravi Bharti
 ** @description - users routes
 */

const express = require("express");
const router = express.Router();
const { isLogin, isVerified, isAuthenticated } = require("../middlewares/mdl.auth");
const User = require("../models/user");
const UserInfo = require("../models/profile");
const { addProfile, getProfile } = require("../controllers/ctrl.profile");
const { getOneProfile, getAllProfile } = require("../controllers/ctrl.profile");
const { getProfilePhoto, updateProfile } = require("../controllers/ctrl.profile");
const { getUser, getAllUser } = require("../controllers/ctrl.user");
const { searchUser, searchUserByName } = require("../controllers/ctrl.user");
const { updateInfo, updateUser } = require("../controllers/ctrl.user");
const { addFriends } = require("../controllers/ctrl.user");

/** @GET users listing.
 ** @Routes "/user/"
 */

//Get User
router.get("/user", isLogin, isVerified, isAuthenticated, getUser);
//Get All Users:
router.get("/user/all", isLogin, isVerified, isAuthenticated, getAllUser);

//Search User ? user_id;
router.get("/user/search", isLogin, isVerified, isAuthenticated, searchUser);
router.get("/user/search/name", isLogin, isVerified, isAuthenticated, searchUserByName);
router.get("/user/add/friends", isLogin, isVerified, isAuthenticated, addFriends);

/**
 * @Get - User Profile Routes:
 * @Post - User Profile:
 */
//get user profile picture
router.get("/profile/photo", getProfilePhoto);

//Add profile
router.post("/user/profile", isLogin, isVerified, isAuthenticated, addProfile);
//Get Profile
router.get("/user/profile", isLogin, isVerified, isAuthenticated, getProfile);
//Get All User Profile
router.get("/user/profile/all", isLogin, isVerified, isAuthenticated, getAllProfile);
//Get One User Profile
router.get("/user/profile/search", isLogin, isVerified, isAuthenticated, getOneProfile);

module.exports = router;
