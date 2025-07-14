

// src/redux/thunk/order.thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderApi } from '../../services/order.api';
import { toast } from 'react-hot-toast';

// Existing thunks
export const fetchOrder = createAsyncThunk(
  'order/fetchById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrder(orderId);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch order');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order'
      );
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getUserOrders();
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

export const cancelUserOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await orderApi.cancelOrder(orderId);
      toast.success('Order cancelled successfully');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to cancel order'
      );
    }
  }
);

// New admin thunk for fetching all orders with filtering and pagination
export interface OrderQueryParams {
  status?: string[];
  paymentStatus?: string[];
  paymentMethod?: string[];
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const fetchAdminOrders = createAsyncThunk(
  'order/fetchAdminOrders',
  async (params: OrderQueryParams = {}, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAllOrders(params);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// Admin thunk for updating order status
export const updateOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async (
    {
      orderId,
      status,
      comment,
    }: {
      orderId: string;
      status: string;
      comment?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await orderApi.updateOrderStatus(orderId, status, comment);
      toast.success(`Order status updated to ${status}`);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update order status');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order status'
      );
    }
  }
);

// Admin thunk for updating payment status
export const updateOrderPaymentStatus = createAsyncThunk(
  'order/updatePaymentStatus',
  async (
    {
      orderId,
      paymentStatus,
      transactionId,
    }: {
      orderId: string;
      paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
      transactionId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await orderApi.updatePaymentStatus(
        orderId,
        paymentStatus,
        transactionId
      );
      toast.success(`Payment status updated to ${paymentStatus}`);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update payment status');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update payment status'
      );
    }
  }
);
// Add this to order.thunk.ts
export const fetchOrderSummary = createAsyncThunk(
  'order/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getOrderSummary();
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch order summary');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order summary'
      );
    }
  }
);