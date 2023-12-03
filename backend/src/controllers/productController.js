import asyncWrapper from "../middlewares/asyncWrapper.js";
import productService from "../services/ProductService.js";

export const createProduct = asyncWrapper(async (req, res) => {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, product });
});

export const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, products });
});

export const getProductById = asyncWrapper(async (req, res) => {
    const { id: receivedId } = req.params;
    const product = await productService.getProductById(receivedId);
    
    res.status(200).json({ success: true, product });
});