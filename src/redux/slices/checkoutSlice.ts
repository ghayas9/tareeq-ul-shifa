import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutSession } from '../../types/checkoutTypes';
import {
  startCheckout,
  getCheckoutSession,
  saveContactInfo,
  saveDeliveryInfo,
  savePaymentInfo,
  placeOrder,
  cancelCheckout,
} from '../thunk/checkout.thunk';

interface CheckoutState {
  session: CheckoutSession | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CheckoutState = {
  session: null,
  isLoading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    clearCheckoutState: (state) => {
      state.session = null;
      state.isLoading = false;
      state.error = null;
    },
    clearCheckoutError: (state) => {
      state.error = null;
    },
    setCheckoutLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCheckoutStep: (state, action: PayloadAction<number>) => {
      if (state.session) {
        state.session.step = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Start checkout
    builder.addCase(startCheckout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(startCheckout.fulfilled, (state, action: PayloadAction<CheckoutSession>) => {
      state.isLoading = false;
      state.session = action.payload;
    });
    builder.addCase(startCheckout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to start checkout';
    });

    // Get checkout session
    builder.addCase(getCheckoutSession.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCheckoutSession.fulfilled, (state, action: PayloadAction<CheckoutSession>) => {
      state.isLoading = false;
      state.session = action.payload;
    });
    builder.addCase(getCheckoutSession.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to get checkout session';
    });

    // Save contact info
    builder.addCase(saveContactInfo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(saveContactInfo.fulfilled, (state, action: PayloadAction<CheckoutSession>) => {
      state.isLoading = false;
      state.session = action.payload;
    });
    builder.addCase(saveContactInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to save contact information';
    });

    // Save delivery info
    builder.addCase(saveDeliveryInfo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(saveDeliveryInfo.fulfilled, (state, action: PayloadAction<CheckoutSession>) => {
      state.isLoading = false;
      state.session = action.payload;
    });
    builder.addCase(saveDeliveryInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to save delivery information';
    });

    // Save payment info
    builder.addCase(savePaymentInfo.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(savePaymentInfo.fulfilled, (state, action: PayloadAction<CheckoutSession>) => {
      state.isLoading = false;
      state.session = action.payload;
    });
    builder.addCase(savePaymentInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to save payment information';
    });

    // Place order
    builder.addCase(placeOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.session = null; // Clear checkout session after successful order
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to place order';
    });

    // Cancel checkout
    builder.addCase(cancelCheckout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(cancelCheckout.fulfilled, (state) => {
      state.isLoading = false;
      state.session = null; // Clear checkout session after cancellation
    });
    builder.addCase(cancelCheckout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to cancel checkout';
    });
  },
});

export const {
  clearCheckoutState,
  clearCheckoutError,
  setCheckoutLoading,
  setCheckoutStep,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;