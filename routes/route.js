const express = require("express");
const authHandler = require("./auth");
const postsHandler = require("./post");
const userHandler = require("./users");
const feedHandler = require("./feed");

const router = express.Router();

router.use("/auth", authHandler);
router.use("/post", postsHandler);
router.use("/user", userHandler);
router.use("/feed", feedHandler);

module.exports = router;
