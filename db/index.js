const mongoose = require("mongoose");
const { dbConfig } = require("../config");

const db = {
  /**
   *
   * initialize the mongodb connection
   */
  init: function () {
    mongoose.connect(dbConfig.URI, dbConfig.options).catch((err) => {
      console.error("🚧 Error: ", err);
      //Todo: add error handler
    });
  },
};

module.exports = db;
