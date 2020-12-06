/**
 * @author Ravi Bharti
 ** @description - post controllers
 */

const formidable = require("formidable");
const fs = require("fs");
const { sortBy } = require("lodash");
const Post = require("../models/post");
const User = require("../models/user");

//create post methods
const createPostController = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  const userid = req.userid;
  //parsing request
  form.parse(req, (err, fields, file) => {
    if (err)
      return res.status(400).json({ error: `somthing wrong: ${err.message}` }); //handling error
    if (!fields) return res.status(400).json({ message: "Include all fields" });
    //creating post
    let post = new Post(fields);
    //setting photo data in to model
    if (file.photo) {
      if (file.photo.size > 5 * 1024 * 1024)
        return res.status(400).json({ message: "file size to big" });
      post.photo.data = fs.readFileSync(file.photo.path);
      post.photo.contentType = file.photo.type;
    }
    post.userid = userid; //users post id
    //add post in db
    post.save((err, newPost) => {
      if (err) {
        return res.json({
          error: err.message,
          message: "unable to create post",
        });
      }
      newPost.photo = undefined;
      res.json({ message: "Post added successfully", newPost });
    });
  });
};

//get single post

const getAPost = async (req, res) => {
  try {
    await Post.findById(req.query.post_id, (err, post) => {
      if (err) return res.status(404).json({ error: err.message });
      post.photo = undefined;
      res.json(post);
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ error: error.message });
  }
};

//get photo
const getPhoto = (req, res, next) => {
  return Post.findById(req.query.post_id).exec((err, post) => {
    if (err) return res.status(400).send("unable to fetch photo");
    if (post.photo.data) {
      res.set("Content-Type", post.photo.contentType);
      res.send(post.photo.data);
    }
    next();
  });
};

const getAllPost = async (req, res) => {
  try {
    Post.find((err, posts) => {
      if (err) return res.status(404).json({ error: err.message });
      return res.json(posts);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ error: err.message });
  }
};

const getFeed = async (req, res) => {
  try {
    Post.find()
      .select("-photo")
      .sort([[sortBy, "desc"]])
      .limit(10)
      .exec((err, posts) => {
        if (err) return res.status(404).json({ error: err.message });
        res.json(posts.reverse());
      });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ error: error.message });
  }
};

//get Logged User posts

const getLoggedUserPost = async (req, res) => {
  const id = req.userid;
  try {
    await Post.find({ userid: id })
      .select("-photo")
      .exec((err, posts) => {
        if (err) return res.status(404).json({ error: err.message });
        if (posts.length === 0)
          return res.json({ message: "you have no posts" });
        res.json(posts);
      });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ error: error.message });
  }
};

//delte post method
const deletePost = async (req, res) => {
  if (req.query.post_id === "")
    return res.status(404).json({ error: "post id required" });
  try {
    await Post.findById(req.query.post_id, (err, post) => {
      if (err || !post)
        return res.status(400).json({ error: err || "post not found" });
      post.deleteOne((err, item) => {
        return res.status(200).json({ message: "post deleted" });
      });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).json({ error: err.message });
  }
};

//add likes
const addLikes = async (req, res) => {
  try {
    await Post.findById(req.query.post_id, (err, post) => {
      if (err) return res.status(400).json({ error: err.message });
      const { likes } = post;
      likes.push(req.userid);
      post.save();
      post.photo = undefined;
      return res.json(post);
    });
  } catch (err) {
    console.log("err: ", err.message);
    return res.status(404).json({ error: err.message });
  }
};
//isLiked post
const isLiked = (req, res, next) => {
  Post.findById(req.query.post_id, async (err, post) => {
    if (err) return res.status(400).json({ message: err.message });
    const isLike = await post.likes.find((id) => id === req.userid);
    if (isLike) return res.status(300).json({ message: true });
    next(false);
  });
};
//add comments
const addComments = async (req, res) => {
  const comment = {
    id: req.userid,
    title: req.body.comment,
  };
  try {
    await Post.findById(req.query.post_id, (err, post) => {
      if (err) return res.status(400).json({ error: err.message });
      const { comments } = post;
      comments.push(comment);
      post.save();
      post.photo = undefined;
      res.json(post);
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createPostController,
  getAPost,
  getAllPost,
  getFeed,
  getPhoto,
  getLoggedUserPost,
  deletePost,
  isLiked,
  addLikes,
  addComments,
};
