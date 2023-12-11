import Joi from "joi";
import Product from "../models/product.js";
import CustomError from "../errors/customError.js";
import { getProductSchema } from "../utils/validateHelpers.js"; // Correct function name if misspelled

class ProductService {
  async createProduct(productData) {
    try {
      const product = await Product.create(productData);
      return product.toJSON(); // Return the created product
    } catch (error) {
      console.log(error);
    }
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

  async getProducts(page) {
    const limit = 10;

    try {
      const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

      if (!products) {
        console.log("No products found");
      } else {
        console.log(products);
      }
      return products;
    } catch (error) {
      console.log(error);
    }
    
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new CustomError(404, "Product not found");
    }

    return product;
  }
}

export default new ProductService();
