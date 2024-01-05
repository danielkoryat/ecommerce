import express from "express";
import {
  getUserWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";

const router = express.Router();

router
  .route("/:userId")
  .get(getUserWatchlist)
  .post(addToWatchlist)
  .patch(removeFromWatchlist);

export default router;
