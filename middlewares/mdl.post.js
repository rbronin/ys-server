/**
 * @author Ravi Bharti
 ** @description -  post middlewares
 */

const Post = require("../models/post");
const User = require("../models/user");

const getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("userid")
    .exec((err, post) => {
      if (err) return res.status(404).json({ message: err.message });
      req.post = post;
      next();
    });
};

module.exports = { getPostById };
