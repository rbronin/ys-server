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
    likes: [mongoose.SchemaTypes.ObjectId],
    comments: [
      {
        id: mongoose.SchemaTypes.ObjectId,
        body: String,
        date: Date,
      },
    ],
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
