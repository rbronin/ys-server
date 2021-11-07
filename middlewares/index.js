const express = require("express"); // eslint-disable-line no-unused-vars
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { GITHUB_AUTH_CONFIG } = require("../config/passport");
const { githubCallback } = require("../controllers/auth");

var whitelist = ["http://localhost:3000", "https://codespace101.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const middleware = {
  /**
   * @param {express.Express} app
   * initialize app middlewares
   */
  init: function (app) {
    passport.serializeUser((user, cb) => {
      cb(null, user);
    });
    passport.deserializeUser((user, cb) => {
      cb(null, user);
    });
    passport.use(new GithubStrategy(GITHUB_AUTH_CONFIG, githubCallback));
    app.use(compression());
    app.use(cors(corsOptions));
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());
    // app.use(passport.session());
  },
};

module.exports = middleware;
