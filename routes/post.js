const express = require("express");
const postController = require("../controllers/post.ctlr");
const postRoute = express.Router();

//For Single post
postRoute
  .route("/post")
  .get(postController.createController)
  .post(postController.createController);

postRoute
  .route("/post/:postid")
  .get(postController.createController)
  .put(postController.createController)
  .delete(postController.createController);

module.exports = postRoute;
