const postRoutes = require("./post");
const express = require("express"); // eslint-disable-line no-unused-vars

const router = {
  /**
   * @param {express.Express} app
   * initialize routes
   */
  init: function (app) {
    app.use("/api", postRoutes);
    app.use("/", (req, res) => {
      res.json({
        message: "welcome to codespace app",
      });
    });
    app.use("/*", (req, res) => {
      res.json({
        error: "METHOD_NOT_ALLOWED",
      });
    });
  },
};

module.exports = router;
