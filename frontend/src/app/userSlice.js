import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserAsync,
  logoutUserAsync,
  createUserAsync,
  checkUserAuthAsync,
} from "./thunks/userThunks.js";

const userAuthenticated = (state, { payload }) => {
  const { username, email, _id } = payload.user;
  state.username = username;
  state.email = email;
  state.isAuthenticated = true;
  state.id = _id;
  state.loading = false;
};

const initialState = {
  username: null,
  email: null,
  id: null,
  isAuthenticated: false,
  loading: false,
  serverError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetServerError: (state) => {
      state.serverError = null;
    },
  },
  extraReducers: (builder) => {
    const pendingAction = (state) => {
      state.loading = true;
      state.serverError = null;
    };
    const rejectedAction = (state, { payload }) => {
      state.loading = false;
      state.serverError = payload;
    };

    builder
      .addCase(loginUserAsync.pending, pendingAction)
      .addCase(loginUserAsync.fulfilled, userAuthenticated)
      .addCase(loginUserAsync.rejected, rejectedAction)
      .addCase(logoutUserAsync.fulfilled, () => initialState)
      .addCase(createUserAsync.pending, pendingAction)
      .addCase(createUserAsync.fulfilled, userAuthenticated)
      .addCase(createUserAsync.rejected, rejectedAction)
      .addCase(checkUserAuthAsync.fulfilled, userAuthenticated)
      .addCase(checkUserAuthAsync.rejected, rejectedAction);
  },
});

export const { resetServerError } = userSlice.actions;

export default userSlice.reducer;
