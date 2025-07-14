// src/redux/thunks/coupon.thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { couponApi } from '../../services/coupon.api';
import {
  CouponCreatePayload,
  CouponUpdatePayload,
  CouponValidatePayload,
  CouponQueryParams
} from '../../types/couponTypes';
import toast from 'react-hot-toast';

// Create coupon thunk
export const createCoupon = createAsyncThunk(
  'coupon/create',
  async (payload: CouponCreatePayload, { rejectWithValue }) => {
    try {
      const response = await couponApi.createCoupon(payload);
      toast.success('Coupon created successfully');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
      return rejectWithValue(error.response?.data?.message || 'Failed to create coupon');
    }
  }
);

export const updateCoupon = createAsyncThunk(
  'coupon/update',
  async (payload: CouponUpdatePayload, { rejectWithValue }) => {
    try {
      const response = await couponApi.updateCoupon(payload);
      toast.success('Coupon updated successfully');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get all coupons thunk
export const getAllCoupons = createAsyncThunk(
  'coupon/getAll',
  async (params: CouponQueryParams = {}, { rejectWithValue }) => {
    try {
      const response = await couponApi.getAllCoupons(params);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch coupons');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
    }
  }
);

// Get single coupon thunk
export const getCoupon = createAsyncThunk(
  'coupon/getOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await couponApi.getCoupon(id);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch coupon');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupon');
    }
  }
);

// Delete coupon thunk
export const deleteCoupon = createAsyncThunk(
  'coupon/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await couponApi.deleteCoupon(id);
      toast.success('Coupon deleted successfully');
      return { ...response, id };
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete coupon');
      return rejectWithValue(error.response?.data?.message || 'Failed to delete coupon');
    }
  }
);

// Validate coupon thunk
export const validateCoupon = createAsyncThunk(
  'coupon/validate',
  async (payload: CouponValidatePayload, { rejectWithValue }) => {
    try {
      const response = await couponApi.validateCoupon(payload);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid coupon');
      return rejectWithValue(error.response?.data?.message || 'Invalid coupon');
    }
  }
);

// Increment coupon usage thunk
export const incrementCouponUsage = createAsyncThunk(
  'coupon/incrementUsage',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await couponApi.incrementCouponUsage(id);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update coupon usage');
      return rejectWithValue(error.response?.data?.message || 'Failed to update coupon usage');
    }
  }
);