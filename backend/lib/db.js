const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("✅ Database Connected");
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/chat-app`);
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
};

module.exports = { connectDB };
