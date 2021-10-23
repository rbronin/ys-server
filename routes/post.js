const express = require("express");
const pc = require("../controllers/post.ctlr");
const postRoute = express.Router();

//For Single post
postRoute.route("/post").get(pc.getPosts).post(pc.createController);

postRoute
  .route("/post/:postid")
  .get(pc.createController)
  .put(pc.createController)
  .delete(pc.createController);

module.exports = postRoute;
