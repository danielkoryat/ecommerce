import express from "express";
import {
  getUserWatchlist,
  addToWatchlist,
  removeFromWatchlist
} from "../controllers/watchlistController.js";
import cookieJwtAuth from "../middlewares/cookieJwtAuth.js";

const router = express.Router();

router.route("/:userId")
  .get(cookieJwtAuth, getUserWatchlist)
  .post(cookieJwtAuth, addToWatchlist)
  .patch(cookieJwtAuth, removeFromWatchlist);

export default router;