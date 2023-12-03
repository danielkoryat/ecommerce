import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";
const router = express.Router();

// Public route
router.route("/").get(getAllProducts);

// Protected route: Only authenticated users can create a product
router.route("/").post(cookieJwtAuth, createProduct);

// Public route
router.route("/:id").get(getProductById);

export default router;