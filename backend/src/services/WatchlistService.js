import Watchlist from "../models/Watchlist";
import CustomeError from "../errors/customeError";

class WatchlistService {
  async addProductToWatchlist(userId, productId) {
    const watchlist = await Watchlist.findOne({ userId });
    if (watchlist) {
      // Add the product to the watchlist
      watchlist.products.push(productId);
      await watchlist.save();
    } else {
      const newWatchlist = new Watchlist({
        userId,
        products: [productId],
      });
      await newWatchlist.save();
    }
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
