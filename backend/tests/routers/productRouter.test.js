import express from 'express';
import request from 'supertest';
import productRouter from "../../src/routes/product";
import { createProduct, getAllProducts, getProductById } from "../../src/controllers/productController";
import cookieJwtAuth from "../../src/middlewares/cookieJwtAuth";

// Mock the controller methods and middleware
jest.mock('../../src/controllers/productController', () => ({
  createProduct: jest.fn(),
  getAllProducts: jest.fn(),
  getProductById: jest.fn()
}));

jest.mock('../middlewares/cookieJwtAuth', () => jest.fn((req, res, next) => next()));

// Create an express application for testing
const app = express();
app.use(express.json());
app.use('/products', productRouter);

describe('Product Router', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /products', () => {
    it('should get all products', async () => {
      getAllProducts.mockImplementation((req, res) => res.status(200).json({ success: true }));
      
      await request(app).get('/products')
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBe(true);
          expect(getAllProducts).toHaveBeenCalledTimes(1);
        });
    });
  });

  describe('POST /products', () => {
    it('should create a new product if authenticated', async () => {
      createProduct.mockImplementation((req, res) => res.status(201).json({ success: true }));
      cookieJwtAuth.mockImplementation((req, res, next) => next()); // Simulate successful authentication
      
      await request(app).post('/products')
        .send({ name: 'New Product', price: 99.99 })
        .expect(201)
        .then((response) => {
          expect(response.body.success).toBe(true);
          expect(createProduct).toHaveBeenCalledTimes(1);
        });
    });

    it('should not create a new product if not authenticated', async () => {
      cookieJwtAuth.mockImplementation((req, res) => res.status(401).json({ success: false })); // Simulate failed authentication
      
      await request(app).post('/products')
        .send({ name: 'New Product', price: 99.99 })
        .expect(401)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(createProduct).not.toHaveBeenCalled();
        });
    });
  });

  describe('GET /products/:id', () => {
    it('should get a product by id', async () => {
      const productId = '123';
      getProductById.mockImplementation((req, res) => res.status(200).json({ success: true, id: req.params.id }));
      
      await request(app).get(`/products/${productId}`)
        .expect(200)
        .then((response) => {
          expect(response.body.success).toBe(true);
          expect(response.body.id).toBe(productId);
          expect(getProductById).toHaveBeenCalledTimes(1);
        });
    });
  });
});