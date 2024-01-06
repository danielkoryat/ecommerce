import apiClient from "../axios.js";

class WatchlistService {

    async getUserWatchlist(userid) {
        const { data } = await apiClient.get(`/watchlist/${userid}`,);
        return data;
    }

    async addToWatchlist(userId, productId) {
        const { data } = await apiClient.post(`/watchlist/${userId}`, { productId });
        return data;
    }

    async removeFromWatchlist(userId, productId) {
        const { data } = await apiClient.patch(`/watchlist/${userId}`, { productId });
        return data;
    }
}

export default new WatchlistService();