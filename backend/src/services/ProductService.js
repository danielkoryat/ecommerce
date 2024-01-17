import Joi from "joi";
import Product from "../models/product.js";
import CustomError from "../errors/customError.js";
import { getProductSchema } from "../utils/validateHelpers.js";
import {
  uploadImagesToAzure,
  deleteImagesFromAzure,
} from "./AzureStorageService.js";
import mongoose from "mongoose";

class ProductService {
  async createProduct(productData) {
    const images = productData.images || [];
    delete productData.images;

    let uploadedImages = [];
    if (images.length > 0) {
      uploadedImages = await uploadImagesToAzure(images);
    }

    productData.imageUrls = uploadedImages;

    const product = await Product.create(productData);
    return product.toJSON();
  }

  validateProductData(productData) {
    const productSchema = getProductSchema();
    const { error } = productSchema.validate(productData);

    if (error) {
      console.log(error);
      throw new CustomError(
        400,
        error.details.map((detail) => detail.message).join(", ")
      );
    }
  }

  async getProducts(page, limit, categoryFilter) {
    const query = {};
    if (categoryFilter) {
      const categoryIds = categoryFilter.split(",");
      if (categoryIds.length > 0) {
        const objectIds = categoryIds.map(
          (id) => new mongoose.Types.ObjectId(id)
        );
        query.categories = { $all: objectIds };
      }
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit + 1)
      .populate("categories", "name");

    const hasMore = products.length > limit;
    const productsToReturn = hasMore ? products.slice(0, -1) : products;

    return { products: productsToReturn, hasMore };
  }

  async getProductById(id) {
    const product = await Product.findById(id)
      .populate("seller", "username")
      .populate("categories", "name");
    if (!product) {
      throw new CustomError(404, "Product not found");
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new CustomError(404, "Product not found");
    }
    await deleteImagesFromAzure(product.imageUrls);
    await Product.deleteOne({ _id: id });
  }

  async getUsersProducts(id) {
    const products = await Product.find({ seller: id });
    return products;
  }

  async searchProductByName(name) {
    const products = await Product.find({ name: { $regex: name, $options: "i" } });
    return products;
  }

  async getRecentProducts(numberOfPorducts) {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(numberOfPorducts);
    return products;
  }
}

export default new ProductService();
