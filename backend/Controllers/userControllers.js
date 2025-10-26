const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ====================== SIGNUP ======================
exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio: bio || "",
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Signup failed", error: err.message });
  }
};

// ====================== LOGIN ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: err.message });
  }
};

// ====================== UPDATE PROFILE ======================
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, bio, pic } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { fullName, bio, pic },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: err.message,
    });
  }
};

// ====================== CHECK AUTH ======================
exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Auth check failed",
      error: err.message,
    });
  }
};
