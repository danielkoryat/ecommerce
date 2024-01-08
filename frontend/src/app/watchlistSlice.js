import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWatchlistAsync,
  addToWatchlistAsync,
  removeFromWatchlistAsync,
} from "./thunks/watchlistThunks";

const initialState = {
  items: [],
  error: null,
};

function startLoading(state) {
  state.error = null;
}

function loadingFailed(state, action) {
  state.error = action.error;
}

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    resetWatchlist: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlistAsync.pending, startLoading)
      .addCase(fetchWatchlistAsync.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        }
      })
      .addCase(fetchWatchlistAsync.rejected, loadingFailed)
      .addCase(addToWatchlistAsync.pending, startLoading)
      .addCase(addToWatchlistAsync.fulfilled, (state, action) => {
        typeof action.payload === "string" && state.items.push(action.payload);
      })
      .addCase(addToWatchlistAsync.rejected, loadingFailed)
      .addCase(removeFromWatchlistAsync.pending, startLoading)
      .addCase(removeFromWatchlistAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeFromWatchlistAsync.rejected, loadingFailed);
  },
});

export const { resetWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
