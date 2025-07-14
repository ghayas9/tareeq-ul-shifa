// src/redux/thunk/product.thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../services/product.api';
import {
  ProductQueryParams,
  CreateProductData,
  UpdateProductData,
  DeleteManyProductsData,
} from '../../types/productTypes';
import toast from 'react-hot-toast';

// Fetch all products with optional filtering
export const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async (params: ProductQueryParams = {}, { rejectWithValue }) => {
    try {
      const response = await productApi.getAll(params);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);
export const fetchProductsByBrand = createAsyncThunk(
  'product/fetchByBrand',
  async (
    {
      brandId,
      params = {},
    }: { brandId: string; params?: Omit<ProductQueryParams, 'brand'> },
    { rejectWithValue }
  ) => {
    try {
      const response = await productApi.getByBrand(brandId, params);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products by brand'
      );
    }
  }
);
// Fetch a single product
export const fetchProduct = createAsyncThunk(
  'product/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productApi.getOne(id);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product'
      );
    }
  }
);

// Create a new product
export const createProduct = createAsyncThunk(
  'product/create',
  async (data: CreateProductData, { rejectWithValue }) => {
    try {
      const response = await productApi.create(data);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create product'
      );
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, ...data }: UpdateProductData, { rejectWithValue }) => {
    try {
      const response = await productApi.update(id, data);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update product'
      );
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productApi.delete(id);
      return { ...response, id };
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete product'
      );
    }
  }
);

// Bulk delete products
export const bulkDeleteProducts = createAsyncThunk(
  'product/bulkDelete',
  async (data: DeleteManyProductsData, { rejectWithValue }) => {
    try {
      const response = await productApi.bulkDelete(data);
      return { ...response, ids: data.ids };
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete products'
      );
    }
  }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchByCategory',
  async (
    {
      categoryId,
      params = {},
    }: { categoryId: string; params?: Omit<ProductQueryParams, 'category'> },
    { rejectWithValue }
  ) => {
    try {
      const response = await productApi.getByCategory(categoryId, params);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products by category'
      );
    }
  }
);

// Upload product image
export const uploadProductImage = createAsyncThunk(
  'product/uploadImage',
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await productApi.uploadImage(file);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload product image'
      );
    }
  }
);
