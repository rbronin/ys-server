const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    picture: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
