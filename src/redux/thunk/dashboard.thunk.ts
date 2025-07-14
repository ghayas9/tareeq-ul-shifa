// src/redux/thunks/dashboard.thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardApi } from '../../services/dashboard.api';
import toast from 'react-hot-toast';
import { DashboardQueryParams } from '@/types/dashboard.types';

// Get all dashboard data thunk
export const getDashboardData = createAsyncThunk(
  'dashboard/getData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getDashboardData();
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch dashboard data'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard data'
      );
    }
  }
);

// Get dashboard summary metrics thunk
export const getDashboardSummary = createAsyncThunk(
  'dashboard/getSummary',
  async (params: DashboardQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getDashboardSummary(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch dashboard summary'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard summary'
      );
    }
  }
);

// Get sales statistics by period thunk
export const getSalesStats = createAsyncThunk(
  'dashboard/getSalesStats',
  async (params: DashboardQueryParams, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getSalesStats(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch sales statistics'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch sales statistics'
      );
    }
  }
);

// Get top selling products thunk
export const getTopProducts = createAsyncThunk(
  'dashboard/getTopProducts',
  async (params: DashboardQueryParams, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getTopProducts(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch top products'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch top products'
      );
    }
  }
);

// Get category sales statistics thunk
export const getCategorySales = createAsyncThunk(
  'dashboard/getCategorySales',
  async (params: DashboardQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getCategorySales(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch category sales'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category sales'
      );
    }
  }
);

// Get payment method statistics thunk
export const getPaymentStats = createAsyncThunk(
  'dashboard/getPaymentStats',
  async (params: DashboardQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getPaymentStats(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch payment statistics'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch payment statistics'
      );
    }
  }
);

// Get recent orders thunk
export const getRecentOrders = createAsyncThunk(
  'dashboard/getRecentOrders',
  async (params: DashboardQueryParams, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getRecentOrders(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch recent orders'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch recent orders'
      );
    }
  }
);

// Get all graph data for dashboard thunk
export const getGraphData = createAsyncThunk(
  'dashboard/getGraphData',
  async (params: DashboardQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getGraphData(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch graph data'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch graph data'
      );
    }
  }
);

// Get revenue chart data thunk
export const getRevenueChart = createAsyncThunk(
  'dashboard/getRevenueChart',
  async (params: DashboardQueryParams, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getRevenueChart(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch revenue chart data'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch revenue chart data'
      );
    }
  }
);

// Get category chart data thunk
export const getCategoryChart = createAsyncThunk(
  'dashboard/getCategoryChart',
  async (params: DashboardQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getCategoryChart(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Failed to fetch category chart data'
      );
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category chart data'
      );
    }
  }
);

// Get product performance data thunk
export const getProductPerformance = createAsyncThunk(
  'dashboard/getProductPerformance',
  async (params: DashboardQueryParams, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getProductPerformance(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Failed to fetch product performance data'
      );
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch product performance data'
      );
    }
  }
);

// Get order status chart data thunk
export const getOrderStatusChart = createAsyncThunk(
  'dashboard/getOrderStatusChart',
  async (params: DashboardQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getOrderStatusChart(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Failed to fetch order status chart data'
      );
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch order status chart data'
      );
    }
  }
);

// Get payment method chart data thunk
export const getPaymentMethodChart = createAsyncThunk(
  'dashboard/getPaymentMethodChart',
  async (params: DashboardQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getPaymentMethodChart(params);
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'Failed to fetch payment method chart data'
      );
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to fetch payment method chart data'
      );
    }
  }
);