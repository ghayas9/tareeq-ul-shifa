
import axios from 'axios';
import { Order, OrderSummary } from '../types/orderTypes';
import { OrderQueryParams } from '../redux/thunk/order.thunk';
import { api } from '@/config/constants';


api.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const sessionId = localStorage.getItem('session_id');
  if (sessionId) {
    config.headers['x-session-id'] = sessionId;
  }

  return config;
});

export const orderApi = {
  // Get order by ID
  getOrder: async (orderId: string): Promise<Order> => {
    try {
      const response = await api.get(`/order/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Get all orders for the current user
  getUserOrders: async (): Promise<Order[]> => {
    try {
      const response = await api.get('/order');
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Cancel an order
  cancelOrder: async (orderId: string): Promise<any> => {
    try {
      const response = await api.delete(`/checkout/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  },

  // ADMIN METHODS
  
  // Get all orders with filtering and pagination (admin)
  getAllOrders: async (params: OrderQueryParams = {}): Promise<{
    data: Order[];
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> => {
    try {
      // Convert params to query string parameters
      const queryParams = new URLSearchParams();
      
      if (params.status && params.status.length > 0) {
        params.status.forEach(status => {
          queryParams.append('status', status);
        });
      }
      
      if (params.paymentStatus && params.paymentStatus.length > 0) {
        params.paymentStatus.forEach(status => {
          queryParams.append('paymentStatus', status);
        });
      }
      
      if (params.paymentMethod && params.paymentMethod.length > 0) {
        params.paymentMethod.forEach(method => {
          queryParams.append('paymentMethod', method);
        });
      }
      
      if (params.startDate) {
        queryParams.append('startDate', params.startDate.toISOString());
      }
      
      if (params.endDate) {
        queryParams.append('endDate', params.endDate.toISOString());
      }
      
      if (params.minAmount !== undefined) {
        queryParams.append('minAmount', params.minAmount.toString());
      }
      
      if (params.maxAmount !== undefined) {
        queryParams.append('maxAmount', params.maxAmount.toString());
      }
      
      if (params.search) {
        queryParams.append('search', params.search);
      }
      
      if (params.page) {
        queryParams.append('page', params.page.toString());
      }
      
      if (params.pageSize) {
        queryParams.append('pageSize', params.pageSize.toString());
      }
      
      if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy);
      }
      
      if (params.sortOrder) {
        queryParams.append('sortOrder', params.sortOrder);
      }
      
      const response = await api.get(`/order/admin/all?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },
  
  // Update order status (admin only)
  updateOrderStatus: async (
    orderId: string,
    status: string,
    comment?: string
  ): Promise<Order> => {
    try {
      const response = await api.patch(`/order/${orderId}/status`, {
        status,
        comment,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },
  
  // Update payment status
  updatePaymentStatus: async (
    orderId: string,
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
    transactionId?: string
  ): Promise<Order> => {
    try {
      const response = await api.patch(`/order/${orderId}/payment`, {
        paymentStatus,
        transactionId,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  },
  // Add this to order.api.js
getOrderSummary: async (): Promise<OrderSummary> => {
  try {
    const response = await api.get('/order/admin/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching order summary:', error);
    throw error;
  }
}
};