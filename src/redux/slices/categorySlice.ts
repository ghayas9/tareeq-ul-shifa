// src/redux/slices/categorySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../../types/categoryTypes';
import {
  fetchCategories,
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../thunk/category.thunk';

// Initial state
const initialState: CategoryState = {
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

// Create the category slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Clear any errors
    clearCategoryError: (state) => {
      state.error = null;
    },
    // Reset selected category
    resetCategory: (state) => {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = Array.isArray(action.payload.data)
          ? action.payload.data
          : [action.payload.data];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch single category
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.data as any;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          state.categories.push(action.payload.data as any);
        }
        // state?.categories?.push(action?.payload?.data as any);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCategory = action.payload?.data as any;
        if (!updatedCategory?.id) return;
        const index = state.categories.findIndex(
          (cat: any) => cat.id === updatedCategory.id
        );
        if (index !== -1) {
          state.categories[index] = updatedCategory as any;
        }
        state.category = updatedCategory as any;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (cat) => cat?.id !== action?.payload?.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategoryError, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
