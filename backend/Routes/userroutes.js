const express = require("express");
const {
  login,
  signup,
  updateProfile,
  checkAuth,
} = require("../Controllers/userControllers");
const protectRoute = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);

module.exports = userRouter;
