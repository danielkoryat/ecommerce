import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: '',
  isOpen: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isOpen = true;
    },
    clearAlert: (state) => {
      state.message = '';
      state.type = '';
      state.isOpen = false;
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;