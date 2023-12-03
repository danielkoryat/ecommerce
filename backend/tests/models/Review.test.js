import mongoose from 'mongoose';
import Review from '../../src/models/Review'; // Update the path as necessary

// Connect to a new in-memory database before running any tests.
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear all test data after every test.
afterEach(async () => {
  await Review.deleteMany();
});

// Remove and close the db and server.
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Review Model Test', () => {
  const reviewData = {
    user: new mongoose.Types.ObjectId(),
    product: new mongoose.Types.ObjectId(),
    rating: 5,
    comment: 'Great product!',
  };

  it('create & save review successfully', async () => {
    const validReview = new Review(reviewData);
    const savedReview = await validReview.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedReview._id).toBeDefined();
    expect(savedReview.user).toEqual(reviewData.user);
    expect(savedReview.product).toEqual(reviewData.product);
    expect(savedReview.rating).toBe(reviewData.rating);
    expect(savedReview.comment).toBe(reviewData.comment);
    expect(savedReview.time).toBeDefined();
  });

  it('create review without required field should fail', async () => {
    const reviewWithoutRequiredField = new Review({
      user: new mongoose.Types.ObjectId(),
    });
    let err;
    try {
      await reviewWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.product).toBeDefined();
    expect(err.errors.rating).toBeDefined();
    expect(err.errors.comment).toBeDefined();
  });
});