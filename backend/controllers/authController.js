import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id, username: user.username, email: user.email,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const ok = user && (await user.matchPassword(password));
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      _id: user._id, username: user.username, email: user.email,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
