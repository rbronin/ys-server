const Profile = require("../models/profile");

const addFollower = async (id, data) => {
  return await Profile.findByIdAndUpdate(
    id,
    {
      $push: {
        friends: data,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
};
const removeFollower = async (id, data) => {
  return await Profile.findByIdAndUpdate(id, {
    $pop: {
      friends: data,
    },
  });
};

const createProfile = async (id, data) => {
  return await Profile.findByIdAndUpdate(id, {
    $set: {
      username: data,
    },
  });
};
const addInToCollections = async function (userid, itemID) {
  return await Profile.findOneAndUpdate(
    { user: userid },
    {
      $push: {
        collections: itemID,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
};

const getCollections = async function (userid) {
  return await Profile.findOne({ user: userid })
    .populate({
      path: "collections",
      populate: { path: "userid", select: "-password" },
    })
    .select("-picture")
    .exec();
};

const getFriends = async function (userid) {
  return await Profile.findOne({ user: userid })
    .populate({
      path: "friends",
      select: "-password",
    })
    .exec();
};

module.exports = {
  addFollower,
  removeFollower,
  createProfile,
  addInToCollections,
  getCollections,
  getFriends,
};
