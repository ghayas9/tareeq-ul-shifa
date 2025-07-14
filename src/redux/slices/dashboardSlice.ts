// src/redux/slices/dashboard.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  getPaymentMethodChart
} from '../thunk/dashboard.thunk';
import { DashboardState } from '../../types/dashboard.types';

// Initial state
const initialState: DashboardState = {
  dashboardData: null,
  summary: null,
  salesStats: [],
  topProducts: [],
  categorySales: [],
  paymentStats: [],
  recentOrders: [],
  graphData: null,
  revenueChart: null,
  categoryChart: null,
  productPerformance: null,
  orderStatus: null,
  paymentMethods: null,
  isLoading: false,
  error: null,
  currentPeriod: 'monthly',
  startDate: null,
  endDate: null
};

// Create slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    setDateRange: (state, action: PayloadAction<{ startDate: string, endDate: string }>) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setPeriod: (state, action: PayloadAction<'daily' | 'weekly' | 'monthly' | 'yearly'>) => {
      state.currentPeriod = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Get dashboard data
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
        state.summary = action.payload?.summary || null;
        state.salesStats = action.payload?.monthlySales || [];
        state.topProducts = action.payload?.topProducts || [];
        state.categorySales = action.payload?.categorySales || [];
        state.paymentStats = action.payload?.paymentStats || [];
        state.recentOrders = action.payload?.recentOrders || [];
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get dashboard summary
    builder
      .addCase(getDashboardSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(getDashboardSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get sales statistics
    builder
      .addCase(getSalesStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSalesStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesStats = action.payload;
      })
      .addCase(getSalesStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get top products
    builder
      .addCase(getTopProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topProducts = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get category sales
    builder
      .addCase(getCategorySales.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategorySales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categorySales = action.payload;
      })
      .addCase(getCategorySales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get payment stats
    builder
      .addCase(getPaymentStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPaymentStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentStats = action.payload;
      })
      .addCase(getPaymentStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get recent orders
    builder
      .addCase(getRecentOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecentOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recentOrders = action.payload;
      })
      .addCase(getRecentOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get graph data
    builder
      .addCase(getGraphData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGraphData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.graphData = action.payload;
        state.revenueChart = action.payload?.revenueChart || null;
        state.categoryChart = action.payload?.categoryChart || null;
        state.productPerformance = action.payload?.productPerformance || null;
        state.orderStatus = action.payload?.orderStatus || null;
        state.paymentMethods = action.payload?.paymentMethods || null;
      })
      .addCase(getGraphData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get revenue chart
    builder
      .addCase(getRevenueChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRevenueChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenueChart = action.payload;
      })
      .addCase(getRevenueChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get category chart
    builder
      .addCase(getCategoryChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryChart = action.payload;
      })
      .addCase(getCategoryChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get product performance
    builder
      .addCase(getProductPerformance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductPerformance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productPerformance = action.payload;
      })
      .addCase(getProductPerformance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get order status chart
    builder
      .addCase(getOrderStatusChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderStatusChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderStatus = action.payload;
      })
      .addCase(getOrderStatusChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get payment method chart
    builder
      .addCase(getPaymentMethodChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPaymentMethodChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(getPaymentMethodChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearDashboardError, setDateRange, setPeriod } = dashboardSlice.actions;
export default dashboardSlice.reducer;