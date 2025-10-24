const User = require("../models/user");
const jwt = require("jsonwebtoken");
export const protectroute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByID(decoded.userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};
