const express = require("express"); // eslint-disable-line no-unused-vars
const postRoutes = require("./post");
const authRoutes = require("./auth");

const router = {
  /**
   * @param {express.Express} app
   * initialize routes
   */
  init: function (app) {
    app.use("/api", postRoutes);
    app.use("/api", authRoutes);
    app.get("/", (req, res) => {
      res.json({
        message: "welcome to codespace app",
      });
    });
    app.get("/rd", (req, res) => {
      res.redirect("/res");
    });
    app.get("/res", (req, res) => {
      res.json({
        message: "you have been redirect from /rd route",
      });
    });
    app.get("/*", (req, res) => {
      res.json({
        error: "METHOD_NOT_ALLOWED",
      });
    });
  },
};

module.exports = router;
