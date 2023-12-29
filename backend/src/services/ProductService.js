import Joi from "joi";
import Product from "../models/product.js";
import CustomError from "../errors/customError.js";
import { getProductSchema } from "../utils/validateHelpers.js";
import { uploadImagesToAzure, deleteImagesFromAzure } from "./AzureStorageService.js";

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

  async getProducts(page, limit) {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    const hasMore = products.length > limit && products.length > 0; 

    return {products, hasMore};
  }

  async getProductById(id) {
    const product = await Product.findById(id).populate("seller","username");
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
}

export default new ProductService();
