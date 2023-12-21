import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import reviewService from "../../api/services/ReviewService";
import { errorContext } from "../../errors/errorHandler";
import Review from "../../components/Review";
import StarRating from "../../components/StartRating.jsx";
import Spinner from "../../components/Spinner";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  const { fetchData: fetchReviews } = useFetch(reviewService.getProductReviews, errorContext.review);
  const { fetchData: submitReview, loading: submitting,serverError } = useFetch(reviewService.createReview, errorContext.review);

  // Fetch reviews on component mount.
  useEffect(() => {
    const getReviews = async () => {
      const reviewsData = await fetchReviews(productId);
      if (reviewsData) {
        setReviews(reviewsData);
      }
    };

    getReviews();
  }, [productId, fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      productId,
      rating,
      comment: e.target.comment.value,
    };
    const newReview = await submitReview(reviewData);
    if (newReview) {
      // Directly append the new review to the existing reviews list.
      setReviews(prevReviews => [...prevReviews, newReview]);
      // Reset the form and rating after successful submission.
      e.target.comment.value = ''; // Clear the textarea.
      setRating(0); // Reset rating to default/initial value.
    }
  };

  return (
    <div className="space-y-4">
      {/* Reviews list and form */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review._id}
            username={review.user.username}
            comment={review.comment}
            rating={review.rating}
          />
        ))
      ) : (
        <p className="text-lg font-semibold text-gray-700 bg-gray-100 rounded-md p-4 shadow">
          No reviews yet, be the first one.
        </p>
      )}

      <form className="bg-white p-4 rounded-lg shadow" onSubmit={handleSubmit}>
      
        <StarRating onRating={setRating} rating={rating} />
        <textarea name="comment" className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none" placeholder="Write a review..."></textarea>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit Review
        </button>
        {submitting && <Spinner/>}
        {serverError && <p className="text-red-500">{serverError}</p>}
      </form>
    </div>
  );
};

export default ReviewSection;