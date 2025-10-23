const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}/ chat-app`);
  } catch (err) {
    console.log("Error");
  }
};
