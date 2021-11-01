const express = require("express");
const authHandler = require("./auth");
const postHandler = require("./post");

const router = express.Router();

router.use("/auth", authHandler);
router.use("/post", postHandler);

module.exports = router;
