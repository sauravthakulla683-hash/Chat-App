const User = require("../models/user");
const Message = require("../models/message");
const cloudinary = require("../lib/cloudnary");

// Get users for sidebar with unseen messages count
const getUserForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    const filterUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    const unseenMessages = {};

    const promises = filterUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);

    return res.json({ success: true, users: filterUsers, unseenMessages });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all messages between logged-in user and selected user
const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });

    // Mark all messages from the selected user as seen
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { $set: { seen: true } }
    );

    return res.json({ success: true, messages });
  } catch (err) {
    console.error(err.message);
    return res.json({ success: false, message: err.message });
  }
};

// Mark a single message as seen by ID
const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { $set: { seen: true } });
    return res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.json({ success: false, message: err.message });
  }
};

// Send a message (HTTP fallback, no Socket.IO emit here)
const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId, text, image } = req.body;
    let imageUrl = "";

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    if (!receiverId || (!text && !image)) {
      return res
        .status(400)
        .json({ success: false, message: "Receiver and content required" });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
      seen: false,
    });

    return res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getUserForSidebar,
  getMessages,
  markMessageAsSeen,
  sendMessage,
};
