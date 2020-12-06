/**
 *@author Ravi Bharti
 *@description - user routes controller
 */

const User = require("../models/user");

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

module.exports = { getUser, getAllUser, updateInfo, updateUser, searchUser };
