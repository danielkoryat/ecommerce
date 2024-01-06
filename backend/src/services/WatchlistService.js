import Watchlist from "../models/Watchlist.js";
import CustomeError from "../errors/customError.js";

class WatchlistService {
/**
 * Adds a product to the user's watchlist.
 * If the product is already in the watchlist, it is not added again.
 * If the user has no watchlist, a new one is created.
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product.
 * @throws {CustomeError} If userId or productId is missing.
 * @return {Promise<void>} A promise that resolves when the product is added to the watchlist.
 */
  async addProductToWatchlist(userId, productId) {
    if (!userId || !productId) {
        throw new CustomeError("userId and productId are required", 400);
    }
    let watchlist = await Watchlist.findOne({ userId });
    if (watchlist) {
        if (!watchlist.products.includes(productId)) {
            watchlist.products.push(productId);
        }
    } else {
        watchlist = new Watchlist({
            userId,
            products: [productId],
        });
    }
    await watchlist.save();
}

  async removeProductFromWatchlist(userId, productId) {
    const watchlist = await Watchlist.findOne({ userId });
    if (watchlist) {
      if (
        watchlist.products
          .map((product) => product.toString())
          .includes(productId)
      ) {
        // Remove the product from the watchlist
        watchlist.products = watchlist.products.filter(
          (product) => product.toString() !== productId
        );
        await watchlist.save();
      } else {
        throw new CustomeError("Product not found in watchlist", 404);
      }
    } else {
      throw new CustomeError("Watchlist not found", 404);
    }
  }

  async getUserWatchlist(userId) {
    const watchlist = await Watchlist.findOne({ userId });
    return watchlist;
  }
}

export default new WatchlistService();
