const Post = require("../models/post");
const PostMeta = require("../models/post-meta");

const createPost = async function (data) {
  return await Post.create(data);
};
const deletePost = async function (id) {
  return await Post.findByIdAndDelete(id);
};
const getPost = async function (id) {
  return await Post.findById(id);
};
const getPosts = async function (id) {
  return await Post.find({ userid: id });
};
const addLikes = async function (postid) {
  return await PostMeta.findByIdAndUpdate(
    postid,
    {
      $push: {
        likes: postid,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
};
const removeLikes = async function (postid) {
  return await PostMeta.findByIdAndUpdate(postid, {
    $pop: {
      likes: postid,
    },
  });
};

const addComments = async function (comment) {
  return await PostMeta.findByIdAndUpdate(
    comment.id,
    {
      $push: {
        ...comment,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
};

const getLikesAndComments = async function (id) {
  return await PostMeta.find({ _id: id });
};

module.exports = {
  createPost,
  deletePost,
  addLikes,
  removeLikes,
  addComments,
  getPost,
  getPosts,
  getLikesAndComments,
};
