const mongoose = require("mongoose");
const { dbConfig } = require("../config");

const db = {
  /**
   *
   * initialize the mongodb connection
   */
  init: function () {
    mongoose.connect(dbConfig.URI, dbConfig.options);
    const db = mongoose.connection;

    db.on("error", (e) => {
      console.error("DB Error: ", e.toString());
      process.exit(999);
    });
    db.once("open", async function () {
      console.info("DB Connected Successfully");
    });
  },
};

module.exports = db;
