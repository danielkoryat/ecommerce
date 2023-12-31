import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "../api/services/CategoryService";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const categories = await categoryService.getCategories();
    return categories;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload.categories;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer and any actions you want to use directly
export const { updateCategories } = categorySlice.actions;
export default categorySlice.reducer;
