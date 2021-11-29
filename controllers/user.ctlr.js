const userDB = require("../db/user");
const profileDB = require("../db/profile");

const getUserById = async (req, res) => {
  const { userid } = req.params;
  const result = await userDB.getUser(userid).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(400).json({
    message: "User not found",
  });
};

const getProfile = async (req, res) => {
  const { _id } = req.user;
  const result = await userDB.getUser(_id).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(400).json({
    message: "User not found",
  });
};

const createProfile = async (req, res) => {
  const { _id } = req.user;
  const data = req.body;
  const result = await profileDB.createProfile(_id, data).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(400).json({
    message: "Unable to create",
  });
};

const addFollower = async (req, res) => {
  const { _id } = req.user;
  const data = req.body;
  const result = await profileDB.addFollower(_id, data).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(400).json({
    message: "Unable to add follower",
  });
};
const removeFollower = async (req, res) => {
  const { _id } = req.user;
  const data = req.body;
  const result = await profileDB.removeFollower(_id, data).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      data: result,
    });
  }
  return res.status(400).json({
    message: "Unable to remove follower",
  });
};

module.exports = {
  getUserById,
  getProfile,
  createProfile,
  addFollower,
  removeFollower,
};
