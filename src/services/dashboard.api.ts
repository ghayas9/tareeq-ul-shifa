// src/services/dashboard.api.ts
import { api } from '@/config/constants';
import {
  DashboardQueryParams,
  DashboardResponse,
} from '@/types/dashboard.types';

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

export const dashboardApi = {
  // Get comprehensive dashboard data
  getDashboardData: async (): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard');
    return response.data;
  },

  // Get dashboard summary metrics
  getDashboardSummary: async (
    params?: DashboardQueryParams
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/summary', { params });
    return response.data;
  },

  // Get sales statistics by period
  getSalesStats: async (
    params: DashboardQueryParams = {}
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/sales', { params });
    return response.data;
  },

  // Get top selling products
  getTopProducts: async (
    params: DashboardQueryParams = {}
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/top-products', { params });
    return response.data;
  },

  // Get category sales statistics
  getCategorySales: async (
    params?: DashboardQueryParams
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/category-sales', { params });
    return response.data;
  },

  // Get payment method statistics
  getPaymentStats: async (
    params?: DashboardQueryParams
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/payment-stats', { params });
    return response.data;
  },

  // Get recent orders
  getRecentOrders: async (
    params: DashboardQueryParams = {}
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/recent-orders', { params });
    return response.data;
  },

  // Get all graph data for dashboard
  getGraphData: async (
    params?: DashboardQueryParams
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/graphs', { params });
    return response.data;
  },

  // Get revenue chart data
  getRevenueChart: async (
    params: DashboardQueryParams = {}
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/graphs/revenue', { params });
    return response.data;
  },

  // Get category chart data
  getCategoryChart: async (
    params?: DashboardQueryParams
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/graphs/categories', { params });
    return response.data;
  },

  // Get product performance data
  getProductPerformance: async (
    params: DashboardQueryParams = {}
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/graphs/products', { params });
    return response.data;
  },

  // Get order status chart data
  getOrderStatusChart: async (
    params?: DashboardQueryParams
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/graphs/order-status', {
      params,
    });
    return response.data;
  },

  // Get payment method chart data
  getPaymentMethodChart: async (
    params?: DashboardQueryParams
  ): Promise<DashboardResponse> => {
    const response = await api.get('/dashboard/graphs/payment-methods', {
      params,
    });
    return response.data;
  },
};
