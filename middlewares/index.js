const express = require("express"); // eslint-disable-line no-unused-vars
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");

const middleware = {
  /**
   * @param {express.Express} app
   * initialize app middlewares
   */
  init: function (app) {
    app.use(compression());
    app.use(cors());
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
  },
};

module.exports = middleware;
