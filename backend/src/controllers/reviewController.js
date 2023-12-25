import asyncWrapper from "../middlewares/asyncWrapper.js";
import ReviewService from "../services/ReviewService.js";

export const createReview = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const data = { ...req.body, userId };
  const review = await ReviewService.createReview(data);
  res.status(201).json(review);
});

export const getReviewById = asyncWrapper(async (req, res) => {
  const review = await ReviewService.getReviewByProductId(req.params.id);
  res.status(200).json(review);
});

export const deleteReview = asyncWrapper(async (req, res) => {
  const review = await ReviewService.deleteReview(req.params.id);
  res.status(200).json({ success: true, review });
});

export const updateReview = asyncWrapper(async (req, res) => {
  const review = await ReviewService.updateReview(req.params.id, req.body);
  res.status(200).json({ success: true, review });
});

export const getReviewsByUser = asyncWrapper(async (req, res) => {
  const reviews = await ReviewService.getReviewsByUser(req.params.userId);
  res.status(200).json({ success: true, reviews });
});

export const getReviewsByProduct = asyncWrapper(async (req, res) => {
  const reviews = await ReviewService.getReviewsByProduct(req.params.productId);
  res.status(200).json(reviews);
});
