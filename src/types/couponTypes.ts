// src/types/couponTypes.ts

export interface CouponState {
  coupons: Coupon[];
  coupon: Coupon | null;
  totalCoupons: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  validationResult: CouponValidationResult | null;
}

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumPurchase: number | null;
  startDate: string | Date;
  endDate: string | Date | null;
  isActive: boolean;
  usageLimit: number | null;
  usageCount: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  deletedAt?: string | Date | null;
}

export interface CouponCreatePayload {
  code: string;
  description?: string | null;
  discountType?: "percentage" | "fixed";
  discountValue: number;
  minimumPurchase?: number | null;
  startDate?: string | Date;
  endDate?: string | Date | null;
  isActive?: boolean;
  usageLimit?: number | null;
}

export interface CouponUpdatePayload extends Partial<CouponCreatePayload> {
  id: string;
  usageCount?: number;
}

export interface CouponValidatePayload {
  code: string;
  orderTotal: number;
}

export interface CouponQueryParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
  active?: boolean | string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface CouponValidationResult {
  coupon: Coupon;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  finalTotal: number;
}

export interface CouponResponse {
  success?: boolean;
  message?: string;
  coupons?: Coupon[];
  totalCoupons?: number;
  totalPages?: number;
  currentPage?: number;
  coupon?: Coupon;
  discountAmount?: number;
  finalTotal?: number;
  discountType?:string
  discountValue?:number
}