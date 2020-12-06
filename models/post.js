/**
 * @author Ravi Bharti
 * * @description post-schema
 */

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
  },
  details: {
    type: String,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Posts", postSchema);
