const express = require("express");
const passport = require("passport");
const { validateLoginReq, validateSignupReq } = require("../middlewares/auth.mdl");
const authController = require("../controllers/auth.ctr");
const authRouter = express.Router();

authRouter.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

// eslint-disable-next-line no-unused-vars
authRouter.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/api/auth/error" }),
  (req, res) => {
    console.log({ user: req.user });
    res.redirect("http://localhost:3000/feed");
  },
);

authRouter.get("/auth/error", (req, res) => {
  console.log({
    err: "Error on login",
  });
  res.status(400).json({
    message: "Error on login",
  });
});

authRouter.get("/auth/github/success", (req, res) => {
  console.log({
    user: req.user,
  });
  res.status(200).json({
    user: req.user,
  });
});

authRouter.post("/signup", validateSignupReq, authController.addNewUser);
authRouter.post("/signup", validateLoginReq);

module.exports = authRouter;
