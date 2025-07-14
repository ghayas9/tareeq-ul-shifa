// src/hooks/coupon.hooks.ts
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  createCoupon,
  updateCoupon,
  getAllCoupons,
  getCoupon,
  deleteCoupon,
  validateCoupon,
  incrementCouponUsage
} from '../redux/thunk/coupon.thunk';
import { clearCoupon, clearCouponError, clearValidationResult } from '../redux/slices/couponSlice';
import {
  CouponCreatePayload,
  CouponUpdatePayload,
  CouponValidatePayload,
  CouponQueryParams
} from '../types/couponTypes';

export const useCoupon = () => {
  // Use our typed dispatch
  const dispatch = useAppDispatch();
  
  // Use our typed selector
  const {
    coupons,
    coupon,
    totalCoupons,
    totalPages,
    currentPage,
    isLoading,
    error,
    validationResult
  } = useAppSelector((state:any) => state.coupon);

  // Create a new coupon
  const addCoupon = async (couponData: CouponCreatePayload) => {
    return dispatch(createCoupon(couponData)).unwrap();
  };

  // Update an existing coupon
  const editCoupon = async (couponData: CouponUpdatePayload) => {
    return dispatch(updateCoupon(couponData)).unwrap();
  };

  // Fetch all coupons with optional filters
  const fetchCoupons = async (params: CouponQueryParams = {}) => {
    return dispatch(getAllCoupons(params)).unwrap();
  };

  // Fetch a single coupon by ID
  const fetchCoupon = async (id: string) => {
    return dispatch(getCoupon(id)).unwrap();
  };

  // Delete a coupon
  const removeCoupon = async (id: string) => {
    return dispatch(deleteCoupon(id)).unwrap();
  };

  // Validate a coupon for an order
  const checkCoupon = async (couponData: CouponValidatePayload) => {
    return dispatch(validateCoupon(couponData)).unwrap();
  };

  // Increment the usage count of a coupon
  const incrementUsage = async (id: string) => {
    return dispatch(incrementCouponUsage(id)).unwrap();
  };

  // Clear the current coupon from state
  const resetCoupon = () => {
    dispatch(clearCoupon());
  };

  // Clear any error messages
  const clearError = () => {
    dispatch(clearCouponError());
  };

  // Clear validation result
  const resetValidationResult = () => {
    dispatch(clearValidationResult());
  };

  return {
    // State
    coupons,
    coupon,
    totalCoupons,
    totalPages,
    currentPage,
    isLoading,
    error,
    validationResult,
    
    // Actions
    addCoupon,
    editCoupon,
    fetchCoupons,
    fetchCoupon,
    removeCoupon,
    checkCoupon,
    incrementUsage,
    resetCoupon,
    clearError,
    resetValidationResult
  };
};