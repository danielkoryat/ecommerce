import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import reviewService from "../../api/services/ReviewService";
import { errorContext } from "../../errors/errorHandler";
import Review from "../../components/Review";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  const {
    loading: loadingReviews,
    serverError: fetchingReviewError,
    fetchData: fetchReviews,
  } = useFetch(reviewService.getProductReviews, errorContext.review);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await fetchReviews(productId);
      if (reviews) {
        setReviews(reviews);
      }
    };

    getReviews();
  }, [productId]);

  return (
    <div className="space-y-4">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review._id}
            username={review.username}
            comment={review.comment}
          />
        ))
      ) : (
        <p className="text-lg font-semibold text-gray-700 bg-gray-100 rounded-md p-4 shadow">
          No reviews yet, be the first one
        </p>
      )}
      <form className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Add your review
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="3"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
