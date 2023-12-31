import mongoose from "mongoose";
import axios from "axios";
import path from "path";
import faker from "faker";
import { uploadImagesToAzure } from "./src/services/AzureStorageService.js";
import Product from "./src/models/Product.js";
import User from "./src/models/User.js";
import Category from "./src/models/Category.js";
import env from "dotenv";
env.config();

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.CONTAINER_NAME;

const downloadImageAsBuffer = async (imageUrl) => {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const buffer = response.data;
  const originalname = path.basename(imageUrl); 
  return { buffer, originalname };
};



async function generateAndInsertProducts(numberOfProducts) {
  await mongoose.connect(process.env.MONGO_URI);
  for (let i = 0; i < numberOfProducts; i++) {
    // Generate fake product data
    const productName = faker.commerce.productName();
    const productDescription = faker.commerce.productDescription();
    const productPrice = faker.commerce.price();
    const productAmount = faker.datatype.number({ min: 1, max: 100 });

    const imageUrl = await fetchImageFromUnsplash(productName);
    const image = await downloadImageAsBuffer(imageUrl);
    const imageArr = [image];
    const azureImageUrl = await uploadImagesToAzure(imageArr,AZURE_STORAGE_CONNECTION_STRING, CONTAINER_NAME);

    const sellerId = await getRandomSellerId();
    const categoryIds = await getRandomCategoryIds();

    // Create a new product document
    const product = new Product({
      name: productName,
      seller: sellerId,
      description: productDescription,
      price: productPrice,
      amount: productAmount,
      categories: categoryIds,
      imageUrls: azureImageUrl,
    });

    // Save the product document to the database
    await product.save();
    console.log(`Product ${i + 1} created:`, product.name);
  }
}

async function fetchImageFromUnsplash(searchTerm) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    searchTerm
  )}&client_id=${unsplashAccessKey}`;
  try {
    const response = await axios.get(url);
    const imageUrl = response.data.results[0]?.urls.full; 
    if (!imageUrl) {
      throw new Error(`No image found for ${searchTerm}`);
    }
    return imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getRandomCategoryIds(numberOfCategories = 2) {
  const categories = await Category.find().select("_id").exec();
  let randomCategories = [];
  for (let i = 0; i < numberOfCategories; i++) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    randomCategories.push(categories.splice(randomIndex, 1)[0]._id);
  }
  return randomCategories;
}

async function getRandomSellerId() {
  const sellers = await User.find().select("_id").exec();
  const randomIndex = Math.floor(Math.random() * sellers.length);
  return sellers[randomIndex]._id;
}

// Call the function to start the process
generateAndInsertProducts(10)
  .then(() => {
    console.log("Products generated and inserted successfully.");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("An error occurred:", error);
    mongoose.disconnect();
  });
