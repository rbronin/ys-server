require("dotenv").config();
const express = require("express");
const db = require("./db");
const middleware = require("./middlewares");
const router = require("./routes");
const app = express();

// database initialzation
db.init();

//middlewares
middleware.init(app);

//routes
router.init(app);

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server up on port: ${port}`);
});
