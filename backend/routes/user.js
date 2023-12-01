import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", cookieJwtAuth, loginUser);

export default router;
