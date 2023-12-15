import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../api/services/UserService.js';
import { errorContext, getErrorMessage } from '../../errors/errorHandler.js';

export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await UserService.loginUser({ username, password });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.login));
    }
  }
);

export const checkUserAuthAsync = createAsyncThunk(
  'user/checkUserAuthAsync',
  async (_, thunkAPI) => {
    return await UserService.isAuthenticated();
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUserAsync',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const data = await UserService.createUser({ username, email, password });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.register));
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async (_, thunkAPI) => {
    try {
      const data = await UserService.logUserOut();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error.response, errorContext.logout));
    }
  }
);