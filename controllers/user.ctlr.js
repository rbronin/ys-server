const userDB = require("../db/user");
const profileDB = require("../db/profile");

const getUserById = async (req, res) => {
  const id = req.user._id;
  const result = await userDB.getUser(id).catch((err) => {
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
  const result = await userDB.getUserProfile(_id).catch((err) => {
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
      message: "Added successfully",
      data: result,
    });
  }
  return res.status(400).json({
    message: "Unable to create",
  });
};

const addFollower = async (req, res) => {
  const { _id } = req.user;
  const { userid } = req.params;
  const result = await profileDB.addFollower(_id, userid).catch((err) => {
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
  const { userid } = req.params;
  const result = await profileDB.removeFollower(_id, userid).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json(result);
  }
  return res.status(400).json({
    message: "Unable to remove follower",
  });
};

const userRecommendation = async (req, res) => {
  const { _id } = req.user;
  const result = await userDB.getUsers(_id, 5).catch((err) => {
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
    message: "Unable to find recommendation",
  });
};

const addToCollections = async (req, res) => {
  const { _id } = req.user;
  const itemid = req.params.itemid;
  const result = await profileDB.addInToCollections(_id, itemid).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      message: "Added Succesfully",
      result: result.collections,
    });
  }
  return res.status(400).json({
    message: "Unable to add in collection",
  });
};

const fetchCollections = async (req, res) => {
  const { _id } = req.user;
  const result = await profileDB.getCollections(_id).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      result: result.collections || [],
    });
  }
  return res.status(400).json({
    message: "Unable to find in collection",
  });
};

const fetchFriends = async function (req, res) {
  const { _id } = req.user;
  const result = await profileDB.getFriends(_id).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      result: result.friends,
    });
  }
  return res.status(400).json({
    message: "Unable to find in friends",
  });
};
const searchUser = async function (req, res) {
  const { s = "" } = req.query;
  console.log({ searchTSR: s });
  const result = await userDB.searchUser(s.toString()).catch((err) => {
    res.status(400).json({
      message: err.message,
    });
  });

  if (result) {
    return res.status(200).json({
      result: result,
    });
  }
  return res.status(400).json({
    message: "Unable to find in collection",
  });
};

module.exports = {
  getUserById,
  getProfile,
  createProfile,
  addFollower,
  removeFollower,
  userRecommendation,
  addToCollections,
  fetchCollections,
  fetchFriends,
  searchUser,
};
