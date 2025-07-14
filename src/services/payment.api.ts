import axios from 'axios';
import {
  CreditCardPaymentData,
  EasyPaisaPaymentData,
  PaymentResponse,
  EasyPaisaStatusResponse
} from '../types/paymentTypes';
import { api } from '@/config/constants';


// Add request interceptor to include auth token and session ID
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

// Debug interceptor to log requests and responses
api.interceptors.request.use((config) => {
  console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`, config);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ Error from ${error.config?.url}:`, error.response || error);
    return Promise.reject(error);
  }
);

export const paymentApi = {
  // Process credit card payment
  processCreditCardPayment: async (orderId: string, data: CreditCardPaymentData): Promise<PaymentResponse> => {
    try {
      console.log('Processing credit card payment for order:', orderId);
      const response = await api.post(`/payment/credit-card/${orderId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error processing credit card payment:', error);
      throw error;
    }
  },

  // Process EasyPaisa payment
  processEasyPaisaPayment: async (orderId: string, data: EasyPaisaPaymentData): Promise<PaymentResponse> => {
    try {
      console.log('Processing EasyPaisa payment for order:', orderId);
      const response = await api.post(`/payment/easypaisa/${orderId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error processing EasyPaisa payment:', error);
      throw error;
    }
  },

  // Process Cash on Delivery
  processCashOnDelivery: async (orderId: string): Promise<PaymentResponse> => {
    try {
      console.log('Processing Cash on Delivery for order:', orderId);
      // The route should match what's defined in your backend router (no 's' at the end of 'payment')
      const response = await api.post(`/payment/cash-on-delivery/${orderId}`);
      return response.data;
    } catch (error:any) {
      console.error('Error processing cash on delivery:', error);
      // If the API route is not found, try an alternative
      if (error.response && error.response.status === 404) {
        try {
          console.log('Trying alternative route for Cash on Delivery');
          // Try the alternative endpoint (with 's' at the end)
          const alternativeResponse = await api.post(`/payments/cash-on-delivery/${orderId}`);
          return alternativeResponse.data;
        } catch (alternativeError) {
          console.error('Alternative route also failed:', alternativeError);
          throw alternativeError;
        }
      }
      throw error;
    }
  },

  // Check EasyPaisa payment status
  checkEasyPaisaStatus: async (transactionId: string): Promise<EasyPaisaStatusResponse> => {
    try {
      console.log('Checking EasyPaisa status for transaction:', transactionId);
      const response = await api.get(`/payment/easypaisa/status/${transactionId}`);
      return response.data;
    } catch (error:any) {
      console.error('Error checking EasyPaisa status:', error);
      // Try alternative endpoint if the first one fails
      if (error?.response && error?.response.status === 404) {
        try {
          const alternativeResponse = await api.get(`/payments/easypaisa/status/${transactionId}`);
          return alternativeResponse.data;
        } catch (alternativeError) {
          throw alternativeError;
        }
      }
      throw error;
    }
  }
};