import userService from "../services/UserService.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { setTokenCookie } from "../utils/authUtils.js";
import jwt from "jsonwebtoken";

export const login = asyncWrapper(async (req, res) => {
  const user = await userService.validateUser(req.body);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  setTokenCookie(res,req, user);
  return res.status(200).json({user: userService.sanitizeUser(user)});
});

export const checkUserAuth = asyncWrapper(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return res.status(200).json({  user: userService.sanitizeUser(user) });
});

export const signup = asyncWrapper(async (req, res) => {
  const user = await userService.createUser( req.body);

  setTokenCookie(res,req, user);
  res.status(201).json({ success: true, user: userService.sanitizeUser(user) });
});

export const logout = asyncWrapper(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), 
    maxAge: 0,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ success: true });
});

export const getUserDetails = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const user = await userService.getUserById(receivedId);

  res.status(200).json({ user });
});

export const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ users });
});
