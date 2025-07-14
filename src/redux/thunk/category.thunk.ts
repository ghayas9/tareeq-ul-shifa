// src/redux/thunk/category.thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from '../../services/category.api';
import toast from 'react-hot-toast';

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'category/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getAll();
      console.log(response,"response cate")
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);

// Fetch a single category
export const fetchCategory = createAsyncThunk(
  'category/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await categoryApi.getOne(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category'
      );
    }
  }
);

// Create a new category
export const createCategory = createAsyncThunk(
  'category/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await categoryApi.create(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create category'
      );
    }
  }
);

// Update a category
export const updateCategory = createAsyncThunk(
  'category/update',
  async (
    { id, formData }: { id: string; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await categoryApi.update(id, formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update category'
      );
    }
  }
);

// Delete a category
export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await categoryApi.delete(id);
      toast.success(response?.message)
      return { ...response, id };
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete category'
      );
    }
  }
);