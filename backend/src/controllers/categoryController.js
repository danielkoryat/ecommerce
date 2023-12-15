import CategoryService from "../services/CategoryService.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import Category from "../models/Category.js";

export const getCategories = asyncWrapper(async (req, res) => {
    const categories = await CategoryService.getCategories();
    res.status(200).json({ categories });
})

export const createCategory = asyncWrapper(async (req,res) => {
    const name = req.body.name
    const createdCategory = await Category.create({ name });
    res.status(201).json({ success: true, category: createdCategory });
})