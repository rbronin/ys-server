"use strict";
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const InitiateMongoDB = require("./config/db.config");

// mongodb connection//
InitiateMongoDB();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const profileRoutes = require("./routes/users");
/**
 * @Test Routers
 */
const testRoutes = require("./routes/index");

const app = express();

app.use(compression());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", testRoutes);
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", profileRoutes);

module.exports = app;
