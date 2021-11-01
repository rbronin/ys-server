const express = require("express"); // eslint-disable-line no-unused-vars
const routerHandlers = require("./route");

const router = {
  /**
   * @param {express.Express} app
   * initialize routes
   */
  init: function (app) {
    app.use("/api", routerHandlers);
    app.get("/", (req, res) => {
      res.json({
        message: "welcome to codespace app",
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
