const express = require("express");
const pc = require("../controllers/post.ctlr");
const { isValidToken } = require("../controllers/auth.ctr");
const postRoute = express.Router();

//For Single post
postRoute.use(isValidToken);
postRoute.route("/").get(pc.getPosts).post(pc.createController);

postRoute.route("/:postid").get(pc.getPostById).delete(pc.deletePost);
postRoute.post("/like/:postid", pc.addLike);
postRoute.post("/comment/:postid", pc.addComment);

//for testing only
postRoute.get("/private", isValidToken, (req, res) => {
  res.status(200).json({
    message: "Private route",
    user: req.user,
  });
});

module.exports = postRoute;
