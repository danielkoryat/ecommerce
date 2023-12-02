import User from "../models/User.js";
import userService from "../services/UserService.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import jwt from "jsonwebtoken";
import customeError from "../errors/customeError.js"

export const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.validateUser(username, password);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30s",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ success: true, token });
});

export const signup = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userService.createUser({ username, email, password });
  const userToSend = userService.sanitizeUser(user);

  res.status(201).json({ success: true, userToSend });
});

export const logout = asyncWrapper(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ success: true });
});

export const getUserDetails = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;

  const user = await userService.getUserById(receivedId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Send the user details without the password
  res.status(200).json({ user: userService.sanitizeUser(user) });
});

export const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ users });
});


