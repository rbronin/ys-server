const postDB = require("../db/post");

const createController = async (req, res) => {
  let post = req.body;
  const result = await postDB.createPost(post).catch((err) => {
    res.status(404).json({
      message: err.message,
    });
  });
  if (result)
    return res.status(200).json({
      message: "created",
      data: result,
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

const deletePost = async (req, res) => {
  // let user = req.user;
  let postid = req.param.postid;
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
    data: result,
  });
};

module.exports = {
  createController,
  getPosts,
  deletePost,
};
