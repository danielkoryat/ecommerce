import express from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/:id", getProductById);
router.get("/", getAllProducts);
//router.get("/", getAllProducts);

export default router;