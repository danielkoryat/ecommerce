import asyncWrapper from "../middlewares/asyncWrapper";
import watchlistService from "../services/watchlistService";


export const addToWatchlist = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const { productId } = req.body;
  const watchlist = watchlistService.addProductToWatchlist(
    receivedId,
    productId
  );
  res.status(200).json({ success: true, watchlist });
});

export const removeFromWatchlist = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const { productId } = req.body;
  const watchlist = watchlistService.removeProductFromWatchlist(
    receivedId,
    productId
  );
  res.status(200).json({ success: true, watchlist });
});

export const getUserWatchlist = asyncWrapper(async (req, res) => {
  const { id: receivedId } = req.params;
  const watchlist = watchlistService.getUserWatchlist(receivedId);
  res.status(200).json({ watchlist });
});
