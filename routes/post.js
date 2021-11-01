const express = require("express");
const pc = require("../controllers/post.ctlr");
const { isValidToken } = require("../controllers/auth.ctr");
const postRoute = express.Router();

//For Single post
postRoute.route("/").get(pc.getPosts).post(pc.createController);

postRoute
  .route("/post/:postid")
  .get(pc.createController)
  .put(pc.createController)
  .delete(pc.createController);

//for testing only
postRoute.get("/private", isValidToken, (req, res) => {
  res.status(200).json({
    message: "Private route",
    user: req.user,
  });
});

module.exports = postRoute;
