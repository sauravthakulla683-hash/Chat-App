// Signup
import cloudnary from "../lib/cloudnary";
import { generatetoken } from "../lib/utils";
import User from "../models/user";
const bcrypt = require("bcryptjs");

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await User.findone({ email });
    if (user) {
      return res.json({
        success: false,
        message: "Account  Details Already Exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpasword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedpasword,
      bio,
    });
    const token = generatetoken(newUser._id);
    res.json({
      success: true,
      usesData: newUser,
      token,
      message: "Account Create",
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

//Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findone({ email });
    const ispasswordcorrect = await bcrypt.compare(process, userData.password);
    if (!ispasswordcorrect) {
      return res.json({ success: false, message: "Invalid Credintals" });
    }
    const token = generatetoken(newUser._id);
    res.json({
      sucess: true,
      usesData: newUser,
      token,
      message: "Account Create",
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// controller
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { pic, bio, fullName } = req.body;
    const userID = req.user._id;
    let updateUser;
    if (!pic) {
      await User.findByIdAndUpdate(userID, { bio, fullName }, { new: true });
    } else {
      const upload = await cloudnary.uploader.upload(pic);
      updateUser = await User.findByIdAndUpdate(
        userID,
        {
          pic: upload.secure_url,
          bio,
          fullName,
        },
        { new: true }
      );
      res.json({ success: true, message: "Updated user" });
    }
  } catch (err) {
    console.log(err.log);
    res.json({ success: false, message: err.message });
  }
};
