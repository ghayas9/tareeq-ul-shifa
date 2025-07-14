import axios from 'axios';
import {
  CheckoutSession,
  StartCheckoutResponse,
  ContactInfoData,
  DeliveryInfoData,
  PaymentInfoData,
} from '../types/checkoutTypes';
import { api } from '@/config/constants';



// Reuse the same interceptor setup as in cartApi
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

export const checkoutApi = {
  startCheckout: async (cartId?: string): Promise<StartCheckoutResponse> => {
    try {
      const data = cartId ? { cartId } : {};
      const response = await api.post('/checkout', data);
      
      // Store checkout session ID in localStorage for recovery
      if (response.data.id) {
        localStorage.setItem('checkout_session_id', response.data.id);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error starting checkout:', error);
      throw error;
    }
  },

  getCheckoutSession: async (checkoutSessionId?: string): Promise<CheckoutSession> => {
    try {
      // If no ID provided, try to get active session
      const url = checkoutSessionId 
        ? `/checkout/${checkoutSessionId}` 
        : '/checkout';
        
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching checkout session:', error);
      throw error;
    }
  },

  saveContactInfo: async (checkoutSessionId: string, data: ContactInfoData): Promise<CheckoutSession> => {
    console.log(checkoutSessionId,"checkout")
    try {
      const response = await api.post(`/checkout/${checkoutSessionId}/contact`, data);
      return response.data;
    } catch (error) {
      console.error('Error saving contact information:', error);
      throw error;
    }
  },

  saveDeliveryInfo: async (checkoutSessionId: string, data: DeliveryInfoData): Promise<CheckoutSession> => {
    try {
      const response = await api.post(`/checkout/${checkoutSessionId}/delivery`, data);
      return response.data;
    } catch (error) {
      console.error('Error saving delivery information:', error);
      throw error;
    }
  },

  savePaymentInfo: async (checkoutSessionId: string, data: PaymentInfoData): Promise<CheckoutSession> => {
    try {
      const response = await api.post(`/checkout/${checkoutSessionId}/payment`, data);
      return response.data;
    } catch (error) {
      console.error('Error saving payment information:', error);
      throw error;
    }
  },

  placeOrder: async (checkoutSessionId: string, notes?: string): Promise<any> => {
    try {
      const data = notes ? { notes } : {};
      const response = await api.post(`/checkout/${checkoutSessionId}/order`, data);
      
      // Clear checkout session ID once order is placed
      localStorage.removeItem('checkout_session_id');
      
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  },

  cancelCheckout: async (checkoutSessionId: string): Promise<any> => {
    try {
      const response = await api.delete(`/checkout/${checkoutSessionId}`);
      // Clear checkout session ID if cancelled
      localStorage.removeItem('checkout_session_id');
      return response.data;
    } catch (error) {
      console.error('Error cancelling checkout:', error);
      throw error;
    }
  },
};