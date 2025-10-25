const bcrypt = require("bcryptjs");
const User = require("../models/user");
const cloudinary = require("../lib/cloudnary"); // make sure the file name matches exactly
const { generatetoken } = require("../lib/utils");

// 🟩 SIGNUP
const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generatetoken(newUser._id);
    return res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

// 🟩 LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generatetoken(userData._id);
    return res.json({
      success: true,
      userData,
      token,
      message: "Login successful",
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

// 🟩 CHECK AUTH
const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// 🟩 UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { pic, bio, fullName } = req.body;
    const userID = req.user._id;

    let updateUser;

    if (!pic) {
      updateUser = await User.findByIdAndUpdate(
        userID,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(pic);
      updateUser = await User.findByIdAndUpdate(
        userID,
        {
          profilePic: upload.secure_url,
          bio,
          fullName,
        },
        { new: true }
      );
    }

    return res.json({
      success: true,
      user: updateUser,
      message: "Profile updated",
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

// 🟩 EXPORT ALL (CommonJS)
module.exports = { signup, login, checkAuth, updateProfile };
