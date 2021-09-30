const postRoutes = require("./post");
const express = require("express"); // eslint-disable-line no-unused-vars

const router = {
  /**
   * @param {express.Express} app
   * initialize routes
   */
  init: function (app) {
    app.use("/api", postRoutes);
  },
};

module.exports = router;
