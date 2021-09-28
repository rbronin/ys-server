/**
 ** @description Databse configuration:
 */

const mongoose = require("mongoose");

const db = {
  uri_developement: process.env.MONGODB_URL_DEVELOPEMENT,
  uri_production: process.env.MONGODB_URL_PRODUCTION,
  user: process.env.USER,
  password: process.env.PASSWORD,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
/**
 ** @method (Database Connection)
 */
const InitiateMongoDB = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(db.uri_production, db.options);
      console.log("App running in production mode");
    } else {
      await mongoose.connect(db.uri_developement, db.options);
      console.log("Development DB Connected");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = InitiateMongoDB;
