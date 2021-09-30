const mongoose = require("mongoose");

const { ObjectId } = mongoose.SchemaTypes;

const ProfileSchema = new mongoose.Schema({
  userid: {
    type: ObjectId,
    ref: "User",
  },
  picture: {
    data: Buffer,
    contentType: String,
  },
  friends: [
    {
      userid: ObjectId,
      ref: "User",
    },
  ],
  collections: [ObjectId],
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
