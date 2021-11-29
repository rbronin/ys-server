const express = require("express");
const authHandler = require("./auth");
const postsHandler = require("./post");
const userHandler = require("./users");

const router = express.Router();

router.use("/auth", authHandler);
router.use("/post", postsHandler);
router.use("/user", userHandler);

module.exports = router;
