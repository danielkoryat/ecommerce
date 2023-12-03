import Joi from "joi";
import JoiObjectId from "joi-objectid";
import Product from "../models/product.js";
import CustomError from "../errors/customeError.js";

class ProductService {
  // Define the product validation schema using Joi
  productSchema = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    price: Joi.number().min(0).required(),
    amount: Joi.number().min(0).required(),
    categories: Joi.array().items(JoiObjectId(Joi)).optional(), // Assuming you have a Joi.objectId() extension
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().required().trim(),
          alt: Joi.string().required().trim(),
        })
      )
      .optional(),
  });

  async createProduct(productData, userId) {
    // Validate the productData against the schema
    const { error } = this.productSchema.validate(productData);

    // If validation fails, throw a custom error
    if (error) {
      throw new CustomError(400, error.details[0].message);
    }

    // If validation is successful, proceed with product creation
    const { name, description, price, amount, categories, images } =
      productData;
    const product = await Product.create({
      name,
      description,
      price,
      amount,
      categories,
      images,
    });
    return product;
  }

  async getAllProducts() {
    const products = await Product.find();
    return products;
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
