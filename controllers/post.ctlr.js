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
  const result = await postDB.getPosts(id).catch((err) => {
    res.status(404).json({
      message: err,
    });
  });
  if (result.length > 0)
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

module.exports = {
  createController,
  getPosts,
  deletePost,
  getPostById,
};
