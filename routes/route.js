const express = require("express");
const authHandler = require("./auth");
const postsHandler = require("./post");

const router = express.Router();

router.use("/auth", authHandler);
router.use("/post", postsHandler);

module.exports = router;
