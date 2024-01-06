import { createAsyncThunk } from '@reduxjs/toolkit';
import watchlistService from "../../api/services/WatchlistService.js"
import { errorContext, getErrorMessage } from '../../errors/errorHandler.js';

export const fetchWatchlistAsync = createAsyncThunk(
    'watchlist/fetchWatchlistAsync',
    async (userid, thunkAPI) => {
        try {
            const data = await watchlistService.getUserWatchlist(userid);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.watchlist));
        }
    }
)

export const addToWatchlistAsync = createAsyncThunk(
    'watchlist/addToWatchlistAsync',
    async (payload, thunkAPI) => {
        try {
            const { userid, productId } = payload;
            const data = await watchlistService.addToWatchlist(userid,productId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.watchlist));
        }
    }
)

export const removeFromWatchlistAsync = createAsyncThunk(
    'watchlist/removeFromWatchlistAsync',
    async (productId, thunkAPI) => {      
        try {
            const data = await watchlistService.removeFromWatchlist(productId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.watchlist));
        }
    }
)