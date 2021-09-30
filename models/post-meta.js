const mongoose = require("mongoose");

const postMeta = new mongoose.Schema({
  postid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Post",
  },
  likes: [mongoose.SchemaTypes.ObjectId],
  comments: [
    {
      id: mongoose.SchemaTypes.ObjectId,
      body: String,
      date: Date,
    },
  ],
});

const PostMeta = mongoose.model("PostMeta", postMeta);
module.exports = PostMeta;
