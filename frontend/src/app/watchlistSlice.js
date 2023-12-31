import { createSlice } from "@reduxjs/toolkit";
import {fetchWatchlistAsync, addToWatchlistAsync} from "./thunks/watchlistThunks";

const initialState = {
    watchlist: [],
    loading: false,
    serverError: null
};

export const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        resetWatchlist: (state) => {
            state.watchlist = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchlistAsync.fulfilled, (state, action) => {
                state.watchlist = action.payload;
                state.loading = false;
                state.serverError = null;
            })
            .addCase(fetchWatchlistAsync.rejected, (state, {payload}) => {
                state.watchlist = [];
                state.error = payload
            })
            .addCase(fetchWatchlistAsync.pending, (state) => {
                state.loading = true;
                state.serverError = null;
            })
            .addCase(addToWatchlistAsync.fulfilled, (state, action) => {
                state.watchlist = action.payload;
                state.loading = false;
                state.serverError = null;
            })
            .addCase(addToWatchlistAsync.rejected, (state, {payload}) => {
                state.watchlist = [];
                state.error = payload;
            })
    }
})

export const { resetWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer