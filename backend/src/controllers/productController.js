import asyncWrapper from "../middlewares/asyncWrapper.js";
import ProductService from "../services/ProductService.js";

export const createProduct = asyncWrapper(async (req, res) => {
  const userId = req.user._id;

  let productData = { ...req.body, seller: userId, images: req.files };

  ProductService.validateProductData(productData);

  const createdProduct = await ProductService.createProduct(productData);
  return res.status(201).json({ success: true, product: createdProduct });
});

export const getProductById = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const product = await ProductService.getProductById(receivedId);
  res.status(200).json(product);
});
export const deleteProduct = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  await ProductService.deleteProduct(receivedId);
  res
    .status(200)
    .json({ receivedId });
});

export const getProducts = asyncWrapper(async (req, res) => {
  const page = parseInt(req.query.page);
  const categoryFilter = req.query.categories;
  const limit = 10;

  if (Number.isNaN(page)) {
    return res.status(400).json({
      success: false,
      message: "Page number is required and must be greater than 0",
    });
  }
  const { products, hasMore } = await ProductService.getProducts(
    page,
    limit,
    categoryFilter
  );

  return res.status(200).json({
    success: true,
    products,
    hasMore,
  });
});

export const getUsersProducts = asyncWrapper(async (req, res) => {
  const userid = req.user._id;
  const products = await ProductService.getUsersProducts(userid);
  res.status(200).json(products);
});

export const searchProductByName = asyncWrapper(async (req, res) => {
  const name = req.query.name;
  const products = await ProductService.searchProductByName(name);
  res.status(200).json(products);
});

export const getRecentProducts = asyncWrapper(async (req, res) => {
  const numberOfPorducts = req.query.numberOfProducts;
  const products = await ProductService.getRecentProducts(numberOfPorducts);
  res.status(200).json(products);
})





