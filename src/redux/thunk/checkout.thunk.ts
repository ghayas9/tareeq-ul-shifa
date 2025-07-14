import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkoutApi } from '../../services/checkout.api';
import { 
  ContactInfoData, 
  DeliveryInfoData, 
  PaymentInfoData,
  CheckoutSession
} from '../../types/checkoutTypes';
import toast from 'react-hot-toast';

// Start a new checkout session
export const startCheckout = createAsyncThunk(
  'checkout/start',
  async (cartId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await checkoutApi.startCheckout(cartId);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to start checkout');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to start checkout'
      );
    }
  }
);

// Get checkout session by ID or active session
export const getCheckoutSession = createAsyncThunk(
  'checkout/getSession',
  async (checkoutSessionId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await checkoutApi.getCheckoutSession(checkoutSessionId);
      return response;
    } catch (error: any) {
      // Don't show toast for this one as it might be called on page load
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch checkout session'
      );
    }
  }
);

// Save contact information (Step 1)
export const saveContactInfo = createAsyncThunk(
  'checkout/saveContact',
  async (params: { checkoutSessionId: string; data: ContactInfoData }, { rejectWithValue }) => {
    try {
      const response = await checkoutApi.saveContactInfo(params.checkoutSessionId, params.data);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save contact information');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save contact information'
      );
    }
  }
);

// Save delivery information (Step 2)
export const saveDeliveryInfo = createAsyncThunk(
  'checkout/saveDelivery',
  async (params: { checkoutSessionId: string; data: DeliveryInfoData }, { rejectWithValue }) => {
    try {
      const response = await checkoutApi.saveDeliveryInfo(params.checkoutSessionId, params.data);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save delivery information');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save delivery information'
      );
    }
  }
);

// Save payment information (Step 3)
export const savePaymentInfo = createAsyncThunk(
  'checkout/savePayment',
  async (params: { checkoutSessionId: string; data: PaymentInfoData }, { rejectWithValue }) => {
    try {
      const response = await checkoutApi.savePaymentInfo(params.checkoutSessionId, params.data);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save payment information');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save payment information'
      );
    }
  }
);


export const placeOrder = createAsyncThunk(
  'checkout/placeOrder',
  async (checkoutSessionId: string, { rejectWithValue }) => {
    try {
      const response = await checkoutApi.placeOrder(checkoutSessionId);
      toast.success('Order placed successfully!');
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to place order');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to place order'
      );
    }
  }
);
// Cancel checkout
export const cancelCheckout = createAsyncThunk(
  'checkout/cancel',
  async (checkoutSessionId: string, { rejectWithValue }) => {
    try {
      const response = await checkoutApi.cancelCheckout(checkoutSessionId);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to cancel checkout');
      return rejectWithValue(
        error.response?.data?.message || 'Failed to cancel checkout'
      );
    }
  }
);