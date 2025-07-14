import { createAsyncThunk } from '@reduxjs/toolkit';
import * as brandApi from '../../services/brand.api';
import {
  CreateBrandRequest,
  UpdateBrandRequest,
  GetAllBrandsParams,
  GetBrandsWithProductCountParams,
  UpdateDiscountRequest,
  BulkDeleteRequest
} from '@/types/brandTypes';

// Create a new brand
export const createBrandThunk = createAsyncThunk(
  'brand/create',
  async (brandData: CreateBrandRequest, { rejectWithValue }) => {
    try {
      return await brandApi.createBrand(brandData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create brand');
    }
  }
);

// Update an existing brand
export const updateBrandThunk = createAsyncThunk(
  'brand/update',
  async ({ id, data }: { id: string; data: UpdateBrandRequest }, { rejectWithValue }) => {
    try {
      return await brandApi.updateBrand(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update brand');
    }
  }
);

// Get all brands
export const getAllBrandsThunk = createAsyncThunk(
  'brand/getAll',
  async (params: GetAllBrandsParams = {}, { rejectWithValue }) => {
    try {
      return await brandApi.getAllBrands(params);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch brands');
    }
  }
);

// Get a specific brand by ID
export const getBrandByIdThunk = createAsyncThunk(
  'brand/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await brandApi.getBrandById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch brand');
    }
  }
);

// Delete a brand
export const deleteBrandThunk = createAsyncThunk(
  'brand/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      return await brandApi.deleteBrand(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete brand');
    }
  }
);

// Bulk delete brands
export const bulkDeleteBrandsThunk = createAsyncThunk(
  'brand/bulkDelete',
  async (data: BulkDeleteRequest, { rejectWithValue }) => {
    try {
      return await brandApi.bulkDeleteBrands(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete brands');
    }
  }
);

// Update brand discount
export const updateBrandDiscountThunk = createAsyncThunk(
  'brand/updateDiscount',
  async ({ id, data }: { id: string; data: UpdateDiscountRequest }, { rejectWithValue }) => {
    try {
      return await brandApi.updateBrandDiscount(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update brand discount');
    }
  }
);

// Get brands with product count
export const getBrandsWithProductCountThunk = createAsyncThunk(
  'brand/getWithProductCount',
  async (params: GetBrandsWithProductCountParams = {}, { rejectWithValue }) => {
    try {
      return await brandApi.getBrandsWithProductCount(params);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch brands with product count');
    }
  }
);