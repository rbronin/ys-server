const express = require("express");
const { getPublicFeed, getUserFeed } = require("../controllers/post.ctlr");
const { isValidToken } = require("../controllers/auth.ctr");
const feedRoute = express.Router();

//For public feed
feedRoute.route("/").get(getPublicFeed);

// user feed
feedRoute.route("/:userid").get(isValidToken, getUserFeed);

module.exports = feedRoute;
