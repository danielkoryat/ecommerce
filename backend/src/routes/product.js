import express from "express";
import {
  createProduct,
  getProductById,
  getProducts
} from "../controllers/productController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/:id").get(getProductById);

router.route("/")
  .post(cookieJwtAuth, upload.array('images', 8), createProduct)
  .get(getProducts);
// Public route

export default router;