import asyncWrapper from "../middlewares/asyncWrapper.js";
import WatchlistService from "../services/WatchlistService.js";

export const addToWatchlist = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  const watchlist = WatchlistService.addProductToWatchlist(
    userId,
    productId
  );
  res.status(200).json({ success: true, watchlist });
});

export const removeFromWatchlist = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const { productId } = req.body;
  const watchlist = WatchlistService.removeProductFromWatchlist(
    receivedId,
    productId
  );
  res.status(200).json({ success: true, watchlist });
});

export const getUserWatchlist = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const watchlist = WatchlistService.getUserWatchlist(receivedId);
  res.status(200).json({ watchlist });
});
