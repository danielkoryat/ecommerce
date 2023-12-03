import Review from "../models/Review";
import CustomError from "../errors/customeError.js";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

class ReviewService {
  async createReview(reviewData, userId) {
    // Validate the reviewData against the schema
    const { error } = Joi.object({
      product: JoiObjectId(Joi).required(),
      rating: Joi.number().required(),
      comment: Joi.string().required(),
    }).validate(reviewData);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    // If validation is successful, proceed with review creation
    const review = await Review.create({
      ...reviewData,
      user: userId,
    });

    return review;
  }

  async getReviewById(reviewId) {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new CustomError("Review not found", 404);
    }
    return review;
  }

  async deleteReview(reviewId) {
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      throw new CustomError("Review not found", 404);
    }
    return review;
  }

  async updateReview(reviewId, reviewData) {
    // Validate the reviewData against the schema
    const { error } = Joi.object({
      product: JoiObjectId(Joi).optional(),
      rating: Joi.number().optional(),
      comment: Joi.string().optional(),
    }).validate(reviewData);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    const review = await Review.findByIdAndUpdate(reviewId, reviewData, {
      new: true,
    });
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

  async getReviewsByProduct(productId) {
    const reviews = await Review.find({ product: productId });
    if (!reviews) {
      throw new CustomError("Reviews not found", 404);
    }
    return reviews;
  }

}

export default new ReviewService();
