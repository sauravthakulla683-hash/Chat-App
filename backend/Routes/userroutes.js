const express = require("express");
const {
  login,
  signup,
  updateProfile,
  checkAuth,
} = require("../Controllers/userControllers");
const { protectroute } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/post", login);
userRouter.put("/update-profile", protectroute, updateProfile);
userRouter.get("/check", protectroute, checkAuth);

export default userRouter;

