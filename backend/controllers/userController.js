import User from "../models/User.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import jwt from "jsonwebtoken";

export const createUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  return res.status(201).json({ userid: user._id });
});

export const loginUser = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const isMatch = await user.comparePassword(password);
  if (!user || !isMatch) {
    const message = !user ? "User not found" : "Incorrect password";
    return res.status(401).json({ message });
  }
  
  delete user.password;

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30s",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({ message: "User logged in successfully", token });
});
