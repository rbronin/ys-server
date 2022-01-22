const User = require("../models/user");

const UserDB = {
  createUser: async (user) => {
    let result = await User.create(user);
    return result;
  },
  getUser: async (id) => {
    return await User.findById(id).select("-password").exec();
  },
  getUsers: async (id, limit = 5) => {
    return await (
      await User.find().select("-password").limit(limit).exec()
    ).filter((user) => user._id !== id);
  },
  getUserByEmail: async (email) => {
    let result = await User.findOne({ email: email });
    return result;
  },
  getUserProfile: async (id) => {
    return await User.findById(id).select("-password").exec();
  },
};

module.exports = UserDB;
