import Watchlist from "../models/Watchlist.js";
import CustomError from "../errors/customError.js";

class WatchlistService {
/**
 * Adds a product to the user's watchlist.
 * If the product is already in the watchlist, it is not added again.
 * If the user has no watchlist, a new one is created.
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product.
 * @throws {CustomError} If userId or productId is missing.
 * @return {Promise<void>} A promise that resolves when the product is added to the watchlist.
 */
async addProductToWatchlist(userId, productId) {
  if (!userId || !productId) {
    throw new CustomError("userId and productId are required", 400);
  }
  try {
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
  } catch (error) {
    throw new CustomError("Error adding product to watchlist", 500);
  }
}

/**
 * Removes a product from the user's watchlist.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product.
 * @throws {CustomError} If the watchlist is not found or the product is not found in the watchlist.
 */
async  removeProductFromWatchlist(userId, productId) {
    const result = await Watchlist.updateOne(
      { userId, products: productId },
      { $pull: { products: productId } }
    );

    // Check if the watchlist was found and the product was removed
    if (result.n === 0) {
      throw new CustomError("Watchlist not found", 404);
    } else if (result.nModified === 0) {
      throw new CustomError("Product not found in watchlist", 404);
    }
  }


  /**
   * Retrieves the watchlist for a specific user.
   *
   * @param {string} userId - The ID of the user.
   * @return {Promise<Object>} - The watchlist object for the user.
   */
  async getUserWatchlist(userId) {
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      throw new CustomError("Watchlist not found", 404);
    }    
    return watchlist;
  }
}

export default new WatchlistService();
