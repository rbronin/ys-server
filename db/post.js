const Post = require("../models/post");

const createPost = async function (data) {
  return await Post.create(data);
};
const deletePost = async function (id) {
  return await Post.findByIdAndDelete(id);
};
const getPost = async function (id) {
  return await Post.findById(id);
};
const getPosts = async (id) => {
  return await Post.find({ userid: id })
    .populate("userid", ["name", "_id"])
    .populate("comments.id", ["name", "_id"])
    .select("-photo")
    .sort({ createdAt: "desc" })
    .exec();
};
const getFeeds = async (page = 0, limit = 10) => {
  return await Post.find()
    .populate("userid", ["name", "_id"])
    .populate("comments.id", ["name", "_id"])
    .select("-photo")
    .sort({ createdAt: "desc" })
    .skip(page)
    .limit(limit)
    .exec();
};
const addLikes = async function (postid, userid) {
  return await Post.findByIdAndUpdate(
    postid,
    {
      $push: {
        likes: userid,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
};
const removeLikes = async function (postid, userid) {
  return await Post.findByIdAndUpdate(postid, {
    $pop: {
      likes: userid,
    },
  });
};

const addComments = async function (id, comment) {
  return await Post.findByIdAndUpdate(
    id,
    {
      $push: {
        comments: comment,
      },
    },
    {
      new: true,
      upsert: true,
    },
  )
    .populate("comments.id", ["name", "_id"])
    .exec();
};

module.exports = {
  createPost,
  deletePost,
  addLikes,
  removeLikes,
  addComments,
  getPost,
  getPosts,
  getFeeds,
};
