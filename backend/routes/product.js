import express from "express";
import { createProduct, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProducts);