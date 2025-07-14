// src/redux/slices/coupon.slice.ts
import { createSlice } from '@reduxjs/toolkit';
import {
  createCoupon,
  updateCoupon,
  getAllCoupons,
  getCoupon,
  deleteCoupon,
  validateCoupon,
  incrementCouponUsage
} from '../thunk/coupon.thunk';
import { CouponState } from '../../types/couponTypes';

// Initial state
const initialState: CouponState = {
  coupons: [],
  coupon: null,
  totalCoupons: 0,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  validationResult: null
};

// Create slice
const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    clearCoupon: (state) => {
      state.coupon = null;
    },
    clearCouponError: (state) => {
      state.error = null;
    },
    clearValidationResult: (state) => {
      state.validationResult = null;
    }
  },
  extraReducers: (builder) => {
    // Create coupon
    builder
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update coupon
    builder
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get all coupons
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = action.payload.coupons || [];
        state.totalCoupons = action.payload.totalCoupons || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get single coupon
    builder
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload.coupon || null;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete coupon
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== (action.payload as any).id
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Validate coupon
    builder
      .addCase(validateCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.validationResult = {
          coupon: action.payload.coupon!,
          discountAmount: action.payload.discountAmount!,
          discountType: action.payload.discountType as "percentage" | "fixed",
          discountValue: action.payload.discountValue!,
          finalTotal: action.payload.finalTotal!
        };
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.validationResult = null;
      });

    // Increment coupon usage
    builder
      .addCase(incrementCouponUsage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(incrementCouponUsage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(incrementCouponUsage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearCoupon, clearCouponError, clearValidationResult } = couponSlice.actions;
export default couponSlice.reducer;