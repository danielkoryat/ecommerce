import Review from "../models/Review.js";
import CustomError from "../errors/customError.js";
import Joi from "joi";
import JoiObjectId from "joi-objectid";
import { getRevieScheme } from "../utils/validateHelpers.js";

class ReviewService {
  async createReview(reviewData) {
    this.validateReview(reviewData);

    const review = await Review.create({
      user: reviewData.userId,
      product: reviewData.productId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "username"
    );

    return populatedReview;
  }

  async getReviewsByProduct(productId) {
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "username"
    );
    if (!reviews) {
      throw new CustomError("Reviews not found", 404);
    }
    return reviews;
  }

  async deleteReview(reviewId) {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      throw new CustomError("Review not found", 404);
    }
    return review;
  }

  validateReview(reviewData) {
    const schema = getRevieScheme();
    const { error } = schema.validate(reviewData);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
  }

  async updateReview({ reviewId, comment, rating }) {
    this.validateReview({ reviewId, comment, rating });

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { comment, rating },
      {
        new: true,
      }
    );

    if (!review) {
      throw new CustomError("Review not found", 404);
    }
    return review;
  }

  async getReviewsByUser(userId) {
    const reviews = await Review.find({ user: userId });
    if (!reviews) {
      throw new CustomError("Reviews not found", 404);
    }
    return reviews;
  }
}

export default new ReviewService();
