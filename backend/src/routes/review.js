import express from "express";
import {
  createReview,
  getReviewById,
  deleteReview,
  updateReview,
  getReviewsByUser,
  getReviewsByProduct,
} from "../controllers/reviewController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";

const router = express.Router();

router
  .route("/:id")
  .get(getReviewById)
  .patch(cookieJwtAuth, updateReview)
  .delete(cookieJwtAuth, deleteReview);
  

router
  .route("/")
  .post(cookieJwtAuth, createReview);

router
  .route("/user/:userId")
  .get(getReviewsByUser);

router
  .route("/product/:productId")
  .get(getReviewsByProduct);

export default router;
