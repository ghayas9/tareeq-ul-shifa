// src/types/cartTypes.ts
import { Product } from './productTypes';

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  Product?: Product;
}

export interface Cart {
  id: string | null;
  userId: string | null;
  sessionId: string | null;
  status: 'active' | 'checkout' | 'completed' | 'abandoned';
  couponId: string | null;
  couponCode: string | null;
  discountAmount: number;
  subtotalAmount: number;
  totalAmount: number;
  totalItems: number;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  expiredAt?: string | null;
  convertedToOrderId?: string | null;
  Coupon?: {
    id: string;
    code: string;
    discountType: string;
    discountValue: number;
    minimumPurchase: number | null;
    endDate: string | null;
  };
}

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

export interface AddToCartData {
  productId: string;
  quantity?: number;
  sessionId?: string;
}

export interface UpdateCartItemData {
  quantity: number;
  sessionId?: string;
}

export interface ApplyCouponData {
  couponCode: string;
  sessionId?: string;
}

export interface TransferCartData {
  sessionId: string;
}