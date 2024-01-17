import express from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  searchProductByName,
  deleteProduct,
  getRecentProducts
} from "../controllers/productController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/search")
.get(searchProductByName);

router.route("/recent").get(getRecentProducts);

router
.route("/")
.post(cookieJwtAuth, upload.array("images", 8), createProduct)
.get(getProducts);

router.route("/:id")
.get(getProductById)
.delete(cookieJwtAuth, deleteProduct);

export default router;
