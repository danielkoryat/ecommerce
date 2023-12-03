import mongoose from 'mongoose';
import Category from '../../src/models/Category'; // Update the path as necessary

// Connect to a new in-memory database before running any tests.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear all test data after every test.
afterEach(async () => {
  await Category.deleteMany();
});

// Remove and close the db and server.
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Category Model Test', () => {
  it('create & save category successfully', async () => {
    const validCategory = new Category({
      name: 'Electronics',
      description: 'Gadgets and electronic devices.'
    });
    const savedCategory = await validCategory.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedCategory._id).toBeDefined();
    expect(savedCategory.name).toBe(validCategory.name);
    expect(savedCategory.description).toBe(validCategory.description);
  });

  it('insert category successfully, but the field not defined in schema should be undefined', async () => {
    const categoryWithInvalidField = new Category({
      name: 'Books',
      description: 'A variety of books.',
      price: 100 // This field is not defined in the schema
    });
    const savedCategoryWithInvalidField = await categoryWithInvalidField.save();

    expect(savedCategoryWithInvalidField._id).toBeDefined();
    expect(savedCategoryWithInvalidField.price).toBeUndefined();
  });

  it('create category without required field should fail', async () => {
    const categoryWithoutRequiredField = new Category({
      description: 'A category without a name.'
    });
    let err;
    try {
      await categoryWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
  });

  it('create category with a duplicate name should fail', async () => {
    const category1 = new Category({
      name: 'Fashion',
      description: 'Clothing and accessories.'
    });
    await category1.save();

    const category2 = new Category({
      name: 'Fashion',
      description: 'Different description.'
    });
    let err;
    try {
      await category2.save();
    } catch (error) {
      err = error;
    }
    expect(err.code).toBe(11000); // Mongo error code for duplicate key
  });
});