const express = require("express");
const {
  validateLoginReq,
  validateSignupReq,
  isUserExists,
} = require("../middlewares/auth.mdl");
const authController = require("../controllers/auth.ctr");

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.json({
    message: "Auth route",
  });
});

//working
authRouter.post("/signup", validateSignupReq, isUserExists, authController.addNewUser);
authRouter.post(
  "/signin",
  validateLoginReq,
  authController.loginUser,
  authController.generateLoginCredential,
); //Working

authRouter.get("/verify", authController.varifyToken); //Tested

module.exports = authRouter;
