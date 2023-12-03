import express from "express";
import { signup, login, logout, getAllUsers } from "../controllers/userController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";
const router = express.Router();

// Public routes
router.route("/signup").post(signup);
router.route("/login").post(login);
router.get("/logout", logout);

// Protected route: Only authenticated users can retrieve all users
// Also, you might want to add additional checks to ensure only admins can access this route
router.get("/all", cookieJwtAuth, getAllUsers);

export default router;