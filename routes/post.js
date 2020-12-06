/**
 * @author Ravi Bharti
 ** @description - post routers
 */

const express = require("express");
const {
  isLogin,
  isVerified,
  isAuthenticated,
  getUserById,
} = require("../middlewares/mdl.auth");
const {
  createPostController,
  getAPost,
  getAllPost,
  getPhoto,
  getFeed,
  getLoggedUserPost,
  deletePost,
  isLiked,
  addLikes,
  addComments,
} = require("../controllers/ctrl.post");
const { getPostById } = require("../middlewares/mdl.post");
const postRouter = express.Router();

//create post routes
postRouter.post(
  "/create/post",
  isLogin,
  isVerified,
  isAuthenticated,
  createPostController
);

postRouter.param("postId", getPostById);
postRouter.param("userId", getUserById);

postRouter.get("/post/all", isLogin, isVerified, isAuthenticated, getAllPost);
postRouter.get("/post/one", isLogin, isVerified, isAuthenticated, getAPost);
postRouter.get("/post/photo", getPhoto);
postRouter.get(
  "/user/posts",
  isLogin,
  isVerified,
  isAuthenticated,
  getLoggedUserPost
);

postRouter.get("/feed", isLogin, isVerified, isAuthenticated, getFeed);
postRouter.delete(
  "/post/delete/one",
  isLogin,
  isVerified,
  isAuthenticated,
  deletePost
);
postRouter.post(
  "/post/like",
  isLogin,
  isVerified,
  isAuthenticated,
  isLiked,
  addLikes
);
postRouter.post(
  "/post/comment",
  isLogin,
  isVerified,
  isAuthenticated,
  addComments
);
module.exports = postRouter;
