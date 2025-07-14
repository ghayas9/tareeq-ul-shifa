// src/services/coupon.api.ts
import axios from 'axios';
import {
  Coupon,
  CouponCreatePayload,
  CouponUpdatePayload,
  CouponValidatePayload,
  CouponQueryParams,
  CouponResponse
} from '../types/couponTypes';
import { api } from '@/config/constants';

// Add authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const couponApi = {
  // Create a new coupon
  createCoupon: async (payload: CouponCreatePayload): Promise<CouponResponse> => {
    const response = await api.post('/coupon', payload);
    return response.data;
  },

  // Update an existing coupon
  updateCoupon: async (payload: CouponUpdatePayload): Promise<CouponResponse> => {
    const { id, ...couponData } = payload;
    const response = await api.put(`/coupon/${id}`, couponData);
    return response.data;
},
  // Get all coupons with optional filters
  getAllCoupons: async (params: CouponQueryParams = {}): Promise<CouponResponse> => {
    const response = await api.get('/coupon', { params });
    return response.data;
  },

  // Get a single coupon by ID
  getCoupon: async (id: string): Promise<CouponResponse> => {
    const response = await api.get(`/coupon/${id}`);
    return response.data;
  },

  // Delete a coupon
  deleteCoupon: async (id: string): Promise<CouponResponse> => {
    const response = await api.delete(`/coupon/${id}`);
    return response.data;
  },

  // Validate a coupon for an order
  validateCoupon: async (payload: CouponValidatePayload): Promise<CouponResponse> => {
    const response = await api.post('/coupon/validate', payload);
    return response.data;
  },

  // Increment the usage count of a coupon
  incrementCouponUsage: async (id: string): Promise<CouponResponse> => {
    const response = await api.post(`/coupon/${id}/increment-usage`);
    return response.data;
  },
};