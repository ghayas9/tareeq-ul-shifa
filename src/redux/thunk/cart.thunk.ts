// src/redux/thunk/cart.thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartApi } from '../../services/cart.api';
import { 
  AddToCartData, 
  ApplyCouponData,
} from '../../types/cartTypes';
import toast from 'react-hot-toast';

// Fetch cart
export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.getCart();
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch cart');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

// Add item to cart
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async (data: AddToCartData, { rejectWithValue }) => {
    try {
      const response = await cartApi.addToCart(data);
      toast.success('Item added to cart');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add item to cart'
      );
    }
  }
);

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async (
    { cartItemId, quantity }: { cartItemId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartApi.updateCartItem(cartItemId, { quantity });
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update item quantity');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update item quantity'
      );
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (cartItemId: string, { rejectWithValue }) => {
    try {
      const response = await cartApi.removeFromCart(cartItemId);
      toast.success('Item removed from cart');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove item from cart');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove item from cart'
      );
    }
  }
);

// Clear cart (remove all items)
export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.clearCart();
      toast.success('Cart cleared');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to clear cart'
      );
    }
  }
);

// Apply coupon to cart
export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (data: ApplyCouponData, { rejectWithValue }) => {
    try {
      const response = await cartApi.applyCoupon(data);
      toast.success('Coupon applied successfully');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to apply coupon');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to apply coupon'
      );
    }
  }
);

// Remove coupon from cart
export const removeCoupon = createAsyncThunk(
  'cart/removeCoupon',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartApi.removeCoupon();
      toast.success('Coupon removed');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove coupon');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove coupon'
      );
    }
  }
);

// Transfer cart from session to user after login
export const transferCart = createAsyncThunk(
  'cart/transfer',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await cartApi.transferCart(sessionId);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to transfer cart');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to transfer cart'
      );
    }
  }
);