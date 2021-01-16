const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const UserInfoSchema = new mongoose.Schema({
  userid: {
    type: ObjectId,
    ref: "User",
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  friends: {
    type: Array,
    default: [],
  },
  collections: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("UserInfo", UserInfoSchema);
