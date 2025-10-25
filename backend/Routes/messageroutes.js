const express = require("express");
const {
  getUserForSidebar,
  getMessages,
  markMessageAsSeen,
  sendMessage,
} = require("../Controllers/messagecontroller");
const protectRoute = require("../middleware/auth");

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSidebar);

messageRouter.get("mark/:id", protectRoute, getMessages);

messageRouter.put("/:id", protectRoute, markMessageAsSeen);

messageRouter.post("/send/:id", protectRoute, sendMessage);

module.exports = messageRouter;
