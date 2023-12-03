import express from "express";
import {
  getUserWatchlist,
  addToWatchlist,
  removeFromWatchlist
} from "../controllers/watchlistController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";


const router = express.Router();

// Protected routes: Only authenticated users can access their watchlist,
// add to their watchlist, and remove from their watchlist
router.route("/")
  .get(cookieJwtAuth, getUserWatchlist)
  .post(cookieJwtAuth, addToWatchlist)
  .patch(cookieJwtAuth, removeFromWatchlist);

export default router;