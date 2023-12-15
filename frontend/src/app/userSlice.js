import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserAsync,
  checkUserAuthAsync,
  createUserAsync,
  logoutUserAsync,
} from "./thunks/userThunks.js";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    email: null,
    isAuthenticated: false,
    loading: false,
    serverError: null,
  },
  reducers: {
    resetServerError: (state) => {
      state.serverError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.username = null;
        state.email = null;
        state.isAuthenticated = false;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
        state.serverError = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.serverError = action.payload;
      });
  },
});

export const { resetServerError } = userSlice.actions;
export default userSlice.reducer;
