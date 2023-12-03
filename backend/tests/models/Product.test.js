import mongoose from 'mongoose';
import Product from "../../src/models/Product.js";

// Connect to a new in-memory database before running any tests.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear all test data after every test.
afterEach(async () => {
  await Product.deleteMany();
});

// Remove and close the db and server.
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product Model Test', () => {
  it('create & save product successfully', async () => {
    const validProduct = new Product({
      name: 'Test Product',
      description: 'This is a test description',
      price: 100,
      amount: 10,
      categories: [], // Assuming you have some ObjectIds for categories
      images: [
        { url: 'http://example.com/image1.jpg', alt: 'Image 1' },
        { url: 'http://example.com/image2.jpg', alt: 'Image 2' }
      ],
    });
    const savedProduct = await validProduct.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProduct.name);
    expect(savedProduct.description).toBe(validProduct.description);
    expect(savedProduct.price).toBe(validProduct.price);
    expect(savedProduct.amount).toBe(validProduct.amount);
    expect(savedProduct.images.length).toBe(2);
  });

  it('insert product successfully, but the field does not defined in schema should be undefined', async () => {
    const productWithInvalidField = new Product({
      name: 'Test Product',
      description: 'This is a test description',
      price: 100,
      amount: 10,
      tags: ['tag1', 'tag2'], // tags is not defined in the Product Schema
    });
    const savedProductWithInvalidField = await productWithInvalidField.save();
    expect(savedProductWithInvalidField._id).toBeDefined();
    expect(savedProductWithInvalidField.tags).toBeUndefined();
  });

  it('create product without required field should fail', async () => {
    const productWithoutRequiredField = new Product({ name: 'Test Product' });
    let err;
    try {
      await productWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
  });
});