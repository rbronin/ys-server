const postDB = require("../db/post");

const createController = async (req, res) => {
  let post = req.body;
  post.userid = req.user._id;
  const result = await postDB.createPost(post).catch((err) => {
    res.status(404).json({
      message: err.message,
    });
  });
  if (result)
    return res.status(200).json({
      message: "Post created successfully",
      data: { id: result._id },
    });
  else
    return res.json({
      message: "Unable to add post",
    });
};

const getPosts = async (req, res) => {
  const id = req.user._id;
  const result = await postDB.getPosts(id);
  if (result)
    return res.status(200).json({
      data: result,
    });
  else
    return res.status(404).json({
      message: "No post found",
    });
};

const getPostById = async (req, res) => {
  const { postid } = req.params;
  console.log({ postid });
  const result = await postDB.getPost(postid).catch((err) => {
    res.status(404).json({
      message: err.message,
    });
  });
  if (result)
    return res.status(200).json({
      data: result,
    });
  else
    return res.status(404).json({
      message: "No post found",
    });
};

const deletePost = async (req, res) => {
  let postid = req.params.postid;
  if (!postid)
    return res.status(400).json({
      error: "postid is required",
    });

  const result = await postDB.deletePost(postid).catch((err) => {
    res.status(404).json({
      message: err,
    });
  });

  return res.status(200).json({
    message: "Post deleted successfully",
    data: { id: result._id },
  });
};

const getPublicFeed = async (req, res) => {
  const result = await postDB.getFeeds();
  if (result)
    return res.status(200).json({
      data: result,
    });
  else
    return res.status(404).json({
      message: "No post found",
    });
};

const getUserFeed = async (req, res) => {
  const id = req.user._id;
  const result = await postDB.getPosts(id);
  if (result)
    return res.status(200).json({
      data: result,
    });
  else
    return res.status(404).json({
      message: "No post found",
    });
};

const addLike = async (req, res) => {
  const userid = req.user._id;
  const postid = req.params.postid;
  console.log({ postid });
  const result = await postDB.addLikes(postid, userid).catch((err) => {
    res.status(404).json({
      message: err,
    });
  });
  if (result)
    return res.status(200).json({
      data: result,
    });
  else
    return res.status(404).json({
      message: "No post found",
    });
};
const addComment = async (req, res) => {
  const userid = req.user._id;
  const postid = req.params.postid;
  const { data } = req.body;
  let comment = {
    id: userid,
    body: data,
    date: new Date(),
  };
  const result = await postDB.addComments(postid, comment).catch((err) => {
    res.status(404).json({
      message: err,
    });
  });
  if (result) return res.status(200).json(result);
  else
    return res.status(404).json({
      message: "Some eror occured",
    });
};

module.exports = {
  createController,
  getPosts,
  deletePost,
  getPostById,
  getPublicFeed,
  getUserFeed,
  addLike,
  addComment,
};
