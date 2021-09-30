/**
 *@author Ravi Bharti
 *@description - user routes controller
 */

const User = require("../models/user");
const UserInfo = require("../models/profile");

//get a user
const getUser = (req, res) => {
  res.json(req.user);
};

//get all user
const getAllUser = (req, res) => {
  User.find((err, users) => {
    if (err)
      return res.status(400).json({
        message: err.message,
      });
    res.json(users);
  });
};

//update user info
const updateInfo = (req, res) => {
  //todo: add method
  res.json({
    message: "under development",
  });
};
//update user profile
const updateUser = (req, res) => {
  //todo: add method
  res.json({
    message: "Under development",
  });
};
//search user`
const searchUser = (req, res) => {
  User.findById(req.query.user_id, (err, user) => {
    if (err) return res.status(404).json({ message: err.message });
    res.json(user);
  });
};

const searchUserByName = (req, res) => {
  User.find({ name: req.query.u_name })
    .select("-password")
    .exec((err, users) => {
      if (err) return res.status(404).json({ error: err.message });
      if (users.length === 0) return res.status(200).json({ message: "no user found" });
      res.json(users);
    });
};

const addFriends = (req, res) => {
  UserInfo.findById(req.query.userid, (err, userInfo) => {
    if (err) return res.status(400).json({ error: err.message });
    const { friends } = userInfo;
    friends.push(req.body.fId);
    userInfo.save((err, docs) => {
      if (err) return res.status(400).json({ error: err.message });
      docs.photo = undefined;
      res.json(docs);
    });
  });
};

module.exports = {
  getUser,
  getAllUser,
  updateInfo,
  updateUser,
  searchUser,
  searchUserByName,
  addFriends,
};
