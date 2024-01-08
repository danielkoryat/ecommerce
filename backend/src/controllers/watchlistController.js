import asyncWrapper from "../middlewares/asyncWrapper.js";
import WatchlistService from "../services/WatchlistService.js";

export const addToWatchlist = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  await WatchlistService.addProductToWatchlist(
    userId,
    productId
  );
  res.status(200).json(productId);
});

export const removeFromWatchlist = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const { productId } = req.body;
  await WatchlistService.removeProductFromWatchlist(
    receivedId,
    productId
  );
  res.status(200).json({ productId });
});

export const getUserWatchlist = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const watchlist = WatchlistService.getUserWatchlist(receivedId);
  res.status(200).json({ watchlist });
});
