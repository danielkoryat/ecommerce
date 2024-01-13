import express from "express";
import {
  signup,
  login,
  logout,
  checkUserAuth,
} from "../controllers/userController.js";
import { getUsersProducts } from "../controllers/productController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkUserAuth", checkUserAuth);
router.get("/:products", cookieJwtAuth, getUsersProducts);

export default router;
