const mongoose = require("mongoose");

const { ObjectId } = mongoose.SchemaTypes;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
  friends: {
    type: [ObjectId],
    ref: "User",
  },
  collections: {
    type: [ObjectId],
    ref: "Post",
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
