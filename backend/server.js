const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./lib/db");
const userRouter = require("./Routes/userroutes");
const messageRouter = require("./Routes/messageroutes");
const Message = require("./models/message");
const cloudinary = require("./lib/cloudnary");

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: { origin: "*" },
});
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for sending message
  socket.on("sendMessage", async ({ receiverId, text, image }) => {
    try {
      let imageUrl = image || "";

      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = await Message.create({
        senderId: userId,
        receiverId,
        text: text || "",
        image: imageUrl,
        seen: false,
      });

      // Emit to receiver if online
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      // Emit back to sender
      socket.emit("messageSent", newMessage);
    } catch (err) {
      console.error("Socket sendMessage error:", err.message);
      socket.emit("errorMessage", { message: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
app.get("/api/status", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Connect DB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
  });

// Export io and userSocketMap if needed elsewhere
module.exports = { io, userSocketMap };
