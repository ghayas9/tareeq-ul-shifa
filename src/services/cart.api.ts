import axios from 'axios';
import {
  Cart,
  AddToCartData,
  UpdateCartItemData,
  ApplyCouponData,
} from '../types/cartTypes';
import { api } from '@/config/constants';

// Add this to your cartApi.js or in a utility file
const ensureSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    // Generate a random session ID
    sessionId =
      'sess_' +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};
api.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const sessionId = ensureSessionId();
  config.headers['x-session-id'] = sessionId;

  return config;
});

// api.interceptors.request.use((config) => {
//   config.headers = config.headers || {};

//   const token = localStorage.getItem('token');
//   if (token) {
//   config.headers.Authorization = `Bearer ${token}`;
//   }
//   const sessionId = localStorage.getItem('session_id');
//   if (sessionId) {
//     config.headers['x-session-id'] = sessionId;
//   }

//   return config;
// });

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    try {
      const response = await api.get('/cart');

      if (response.headers['x-session-id']) {
        localStorage.setItem('session_id', response.headers['x-session-id']);
      }

      return response.data;
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  },

  addToCart: async (data: AddToCartData): Promise<Cart> => {
    try {
      const response = await api.post('/cart/items', data);
      if (response.headers['x-session-id']) {
        localStorage.setItem('session_id', response.headers['x-session-id']);
      }
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (
    cartItemId: string,
    data: UpdateCartItemData
  ): Promise<Cart> => {
    try {
      const response = await api.put(`/cart/items/${cartItemId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },
  removeFromCart: async (cartItemId: string): Promise<Cart> => {
    try {
      const response = await api.delete(`/cart/items/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  applyCoupon: async (data: ApplyCouponData): Promise<Cart> => {
    try {
      const response = await api.post('/cart/coupon', data);
      return response.data;
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  },
  removeCoupon: async (): Promise<Cart> => {
    try {
      const response = await api.delete('/cart/coupon');
      return response.data;
    } catch (error) {
      console.error('Error removing coupon:', error);
      throw error;
    }
  },

  clearCart: async (): Promise<Cart> => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  transferCart: async (sessionId: string): Promise<Cart> => {
    try {
      const response = await api.post('/cart/transfer', { sessionId });
      localStorage.removeItem('session_id');
      return response.data;
    } catch (error) {
      console.error('Error transferring cart:', error);
      throw error;
    }
  },
};
