import mongoose from "mongoose";
import Watchlist from "../../src/models/Watchlist.js"; // Update the path as necessary
import User from "../../src/models/User.js"; // Update the path as necessary
import Product from "../../src/models/Product.js"; // Update the path as necessary

// Set up a test database connection
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear all test data after every test
afterEach(async () => {
  await Promise.all([
    Watchlist.deleteMany(),
     User.deleteMany(),
     Product.deleteMany()
  ]);
});

// Remove and close the db and server
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Watchlist Model Test", () => {
  it("should create and save a watchlist successfully", async () => {
    const user = new User({
      username: "testuser",
      password: "testpassword",
      email: "testemail",
    });
    const savedUser = await user.save();

    const product1 = new Product({
      name: "testproduct1",
      category: "testcategory1",
      price: 12,
      amount: 12,
      quantity: 12,
      description: "testdescription1",
    });
    const savedProduct1 = await product1.save();

    const product2 = new Product({
      name: "testproduct2",
      category: "testcategory2",
      amount: 12,
      price: 23,
      quantity: 23,
      description: "testdescription2",
    });
    const savedProduct2 = await product2.save();

    const watchlistData = {
      userId: savedUser._id,
      products: [savedProduct1._id, savedProduct2._id],
    };

    const watchlist = new Watchlist(watchlistData);
    const savedWatchlist = await watchlist.save();

    expect(savedWatchlist._id).toBeDefined();
    expect(savedWatchlist.userId).toEqual(watchlistData.userId);
    expect(savedWatchlist.products).toEqual(
      expect.arrayContaining(watchlistData.products)
    );
    expect(savedWatchlist.createdAt).toBeDefined();
    expect(savedWatchlist.updatedAt).toBeDefined();
  });

  it("should fail to create a watchlist without required fields", async () => {
    const watchlistData = {
      products: [], // No userId provided
    };

    let err;
    try {
      const watchlist = new Watchlist(watchlistData);
      await watchlist.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.userId).toBeDefined();
  });
});
