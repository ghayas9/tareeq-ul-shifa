

// src/types/orderTypes.ts
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  price: number;
  originalPrice: number | null;
  totalPrice: number;
  product?: {
    id: string;
    name: string;
    slug: string;
    image?: string;
    brand?: string;
  };
}

export interface OrderHistory {
  id: string;
  orderId: string;
  status: string;
  comment: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactInformation {
  id: string;
  email: string;
  mobileNumber: string;
}

export interface DeliveryInformation {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
}

export interface PaymentInformation {
  id: string;
  paymentMethod: string;
}

export interface CheckoutSession {
  id: string;
  contactInformation?: ContactInformation;
  deliveryInformation?: DeliveryInformation;
  paymentInformation?: PaymentInformation;
}

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  subtotalAmount: number;
  discountAmount: number;
  shippingAmount: number;
  totalAmount: number;
  couponId?: string;
  couponCode?: string;
  paymentMethod: 'credit' | 'easypaisa' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentTransactionId?: string;
  items: OrderItem[];
  history?: OrderHistory[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  // Related entities
  checkoutSessionId?: string;
  cartId?: string;
  checkoutSession?: CheckoutSession;
  user?: User;
}

export interface OrderSummary {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  refundedOrders: number;
}

export interface CreateOrderData {
  paymentMethod: 'credit' | 'easypaisa' | 'cash';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode?: string;
    country: string;
    phone: string;
  };
  notes?: string;
}