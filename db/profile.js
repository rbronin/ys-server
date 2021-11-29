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

module.exports = {
  addFollower,
  removeFollower,
  createProfile,
};
