import mongoose from "mongoose";

const Schema = mongoose.Schema;
const watchlistSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

watchlistSchema.index({ userId: 1 });

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;
