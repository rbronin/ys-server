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
  // let id = "5ff19bfd9d9a541ce4d86923";
  const result = await postDB.getPosts().catch((err) => {
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

module.exports = {
  createController,
  getPosts,
};
