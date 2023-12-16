import apiClient from "../axios";

class ReviewService {

    async createReview(reviewData) {
        const { data } = await apiClient.post("/review", reviewData);
        return data;
    }

    async getProductReviews(productId) {
        const { data } = await apiClient.get(`/review/${productId}`);
        return data;
    }
}

export default new ReviewService();