

import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserProfile from "../models/user.profile.js";  
class UserController {
  // Register a new user
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { _id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET || "ksjdjbchbiyfguhjbchjbcheqbv",
        { expiresIn: "1h" }
      );
     res.cookie("token",token).json({"message":"Login Sucessfully","token":token})
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
  static async logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
  static async setprofile(req,res){
    const userId = req.user._id;
    const { profilePic, bio, socialLinks } = req.body;
    try {
      const userProfile = await UserProfile.findOne({ user: userId });
      if (!userProfile) {
        userProfile = await UserProfile.create({ user: userId , profilePic, bio, socialLinks });
      }
      await UserProfile.findByIdAndUpdate(userProfile._id, { profilePic, bio, socialLinks }, { new: true });
      res.status(200).json({ message: "Profile set successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
  // Get user profile
  static async getProfile(req, res) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      let userProfile = await UserProfile.findOne({ user: user._id });
      if (!userProfile) {
        userProfile = new UserProfile({ user: user._id });
        await userProfile.save();
      }
      const populatedProfile = await userProfile.populate("user", "username email");
      res.status(200).json({ populatedProfile });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
  // Update user profile
  static async updateProfile(req, res) {
    const userId = req.user._id;
    const { profilePic, bio, socialLinks } = req.body;

    try {
      const userProfile = await UserProfile.findOne({ user: userId });
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      userProfile.profilePic = profilePic || userProfile.profilePic;
      userProfile.bio = bio || userProfile.bio;
      userProfile.socialLinks = socialLinks || userProfile.socialLinks;
      await userProfile.save();
      res.status(200).json({ message: "Profile updated successfully", profile: userProfile });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const userId = req.user._id;
      const userProfile = await UserProfile.findByIdAndDelete(userId);
      const user = await User.findByIdAndDelete(userId);
      res.clearCookie("token");
      if (!userProfile || !user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}

export default UserController;
