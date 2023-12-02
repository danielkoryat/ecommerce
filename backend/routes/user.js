import express from "express";
import { signup,login, logout, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

// for development
router.get("/all", getAllUsers);



export default router;
