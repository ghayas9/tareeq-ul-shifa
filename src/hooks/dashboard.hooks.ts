// src/hooks/dashboard.hooks.ts
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  getDashboardData,
  getDashboardSummary,
  getSalesStats,
  getTopProducts,
  getCategorySales,
  getPaymentStats,
  getRecentOrders,
  getGraphData,
  getRevenueChart,
  getCategoryChart,
  getProductPerformance,
  getOrderStatusChart,
  getPaymentMethodChart,
} from '../redux/thunk/dashboard.thunk';
import {
  clearDashboardError,
  setDateRange,
  setPeriod,
} from '../redux/slices/dashboardSlice';
import { DashboardQueryParams } from '../types/dashboard.types';

export const useDashboard = () => {
  // Use our typed dispatch
  const dispatch = useAppDispatch();

  // Use our typed selector
  const {
    dashboardData,
    summary,
    salesStats,
    topProducts,
    categorySales,
    paymentStats,
    recentOrders,
    graphData,
    revenueChart,
    categoryChart,
    productPerformance,
    orderStatus,
    paymentMethods,
    isLoading,
    error,
    currentPeriod,
    startDate,
    endDate,
  } = useAppSelector((state) => state.dashboard);

  // Fetch all dashboard data in one call
  const fetchDashboardData = async () => {
    return dispatch(getDashboardData()).unwrap();
  };

  // Fetch dashboard summary
  const fetchDashboardSummary = async (params?: DashboardQueryParams) => {
    return dispatch(getDashboardSummary(params)).unwrap();
  };

  // Fetch sales statistics
  const fetchSalesStats = async (params: DashboardQueryParams = {}) => {
    const finalParams = {
      ...params,
      period: params.period || currentPeriod,
    };
    return dispatch(getSalesStats(finalParams)).unwrap();
  };

  // Fetch top selling products
  const fetchTopProducts = async (params: DashboardQueryParams = {}) => {
    return dispatch(getTopProducts(params)).unwrap();
  };

  // Fetch category sales
  const fetchCategorySales = async (params?: DashboardQueryParams) => {
    return dispatch(getCategorySales(params)).unwrap();
  };

  // Fetch payment statistics
  const fetchPaymentStats = async (params?: DashboardQueryParams) => {
    return dispatch(getPaymentStats(params)).unwrap();
  };

  // Fetch recent orders
  const fetchRecentOrders = async (params: DashboardQueryParams = {}) => {
    return dispatch(getRecentOrders(params)).unwrap();
  };

  // Fetch all graph data in one call
  const fetchGraphData = async (params?: DashboardQueryParams) => {
    return dispatch(getGraphData(params)).unwrap();
  };

  // Fetch revenue chart data
  const fetchRevenueChart = async (params: DashboardQueryParams = {}) => {
    const finalParams = {
      ...params,
      period: params.period || currentPeriod,
    };
    return dispatch(getRevenueChart(finalParams)).unwrap();
  };

  // Fetch category chart data
  const fetchCategoryChart = async (params?: DashboardQueryParams) => {
    return dispatch(getCategoryChart(params)).unwrap();
  };

  // Fetch product performance data
  const fetchProductPerformance = async (params: DashboardQueryParams = {}) => {
    return dispatch(getProductPerformance(params)).unwrap();
  };

  // Fetch order status chart data
  const fetchOrderStatusChart = async (params?: DashboardQueryParams) => {
    return dispatch(getOrderStatusChart(params)).unwrap();
  };

  // Fetch payment method chart data
  const fetchPaymentMethodChart = async (params?: DashboardQueryParams) => {
    return dispatch(getPaymentMethodChart(params)).unwrap();
  };

  // Update date range
  const updateDateRange = (startDateValue: string, endDateValue: string) => {
    dispatch(
      setDateRange({ startDate: startDateValue, endDate: endDateValue })
    );
  };

  // Update period (daily, weekly, monthly, yearly)
  const updatePeriod = (period: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    dispatch(setPeriod(period));
  };

  // Clear any error messages
  const clearError = () => {
    dispatch(clearDashboardError());
  };

  // Refresh dashboard data with current filters
  const refreshDashboardData = async () => {
    const params: DashboardQueryParams = {
      period: currentPeriod,
    };

    if (startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;
    }

    return dispatch(getDashboardData()).unwrap();
  };

  return {
    // State
    dashboardData,
    summary,
    salesStats,
    topProducts,
    categorySales,
    paymentStats,
    recentOrders,
    graphData,
    revenueChart,
    categoryChart,
    productPerformance,
    orderStatus,
    paymentMethods,
    isLoading,
    error,
    currentPeriod,
    startDate,
    endDate,

    // Actions
    fetchDashboardData,
    fetchDashboardSummary,
    fetchSalesStats,
    fetchTopProducts,
    fetchCategorySales,
    fetchPaymentStats,
    fetchRecentOrders,
    fetchGraphData,
    fetchRevenueChart,
    fetchCategoryChart,
    fetchProductPerformance,
    fetchOrderStatusChart,
    fetchPaymentMethodChart,
    updateDateRange,
    updatePeriod,
    clearError,
    refreshDashboardData,
  };
};
