const User = require("../models/user");

const UserDB = {
  createUser: async (user) => {
    let result = await User.create(user);
    return result;
  },
  getUser: async (id) => {
    return await User.findById(id);
  },
  getUserByEmail: async (email) => {
    let result = await User.findOne({ email: email });
    return result;
  },
};

module.exports = UserDB;
