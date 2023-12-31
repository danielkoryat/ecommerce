import { createAsyncThunk } from '@reduxjs/toolkit';
import watchlistService from '../api/services/WatchlistService';
import { errorContext, getErrorMessage } from '../../errors/errorHandler.js';

export const fetchWatchlistAsync = createAsyncThunk(
    'watchlist/fetchWatchlistAsync',
    async (_, thunkAPI) => {
        try {
            const data = await watchlistService.getWatchlist();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.watchlist));
        }
    }
)

export const addToWatchlistAsync = createAsyncThunk(
    'watchlist/addToWatchlistAsync',
    async (productId, thunkAPI) => {
        try {
            const data = await watchlistService.addToWatchlist(productId);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.watchlist));
        }
    }
)