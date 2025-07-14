
// src/redux/slices/paymentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
  PaymentResponse, 
  EasyPaisaStatusResponse 
} from '../../types/paymentTypes';
import {
  processCreditCardPayment,
  processEasyPaisaPayment,
  processCashOnDelivery,
  checkEasyPaisaStatus,
} from '../thunk/payment.thunk';

interface PaymentState {
  paymentResponse: PaymentResponse | null;
  easyPaisaStatus: EasyPaisaStatusResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  paymentResponse: null,
  easyPaisaStatus: null,
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.paymentResponse = null;
      state.easyPaisaStatus = null;
      state.isLoading = false;
      state.error = null;
    },
    clearPaymentError: (state) => {
      state.error = null;
    },
    setPaymentLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Credit card payment
    builder.addCase(processCreditCardPayment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(processCreditCardPayment.fulfilled, (state, action: PayloadAction<PaymentResponse>) => {
      state.isLoading = false;
      state.paymentResponse = action.payload;
    });
    builder.addCase(processCreditCardPayment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Credit card payment failed';
    });

    // EasyPaisa payment
    builder.addCase(processEasyPaisaPayment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(processEasyPaisaPayment.fulfilled, (state, action: PayloadAction<PaymentResponse>) => {
      state.isLoading = false;
      state.paymentResponse = action.payload;
    });
    builder.addCase(processEasyPaisaPayment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'EasyPaisa payment failed';
    });

    // Cash on Delivery
    builder.addCase(processCashOnDelivery.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(processCashOnDelivery.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.paymentResponse = action.payload;
    });
    builder.addCase(processCashOnDelivery.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Cash on delivery setup failed';
    });

    // Check EasyPaisa Status
    builder.addCase(checkEasyPaisaStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkEasyPaisaStatus.fulfilled, (state, action: PayloadAction<EasyPaisaStatusResponse>) => {
      state.isLoading = false;
      state.easyPaisaStatus = action.payload;
    });
    builder.addCase(checkEasyPaisaStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to check EasyPaisa status';
    });
  },
});

export const {
  clearPaymentState,
  clearPaymentError,
  setPaymentLoading,
} = paymentSlice.actions;

export default paymentSlice.reducer;