// types/checkoutTypes.ts
export interface ContactInfoData {
    email?: string;
    mobileNumber?: string;
    sessionId?: string;
  }
  
  export interface DeliveryInfoData {
    country?: string;
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    postalCode?: string;
    phoneNumber: string;
    shippingMethod?: string;
    saveInformation?: boolean;
    sessionId?: string;
  }
  
  export interface PaymentInfoData {
    paymentMethod: 'credit' | 'easypaisa' | 'cash';
    cardNumber?: string;
    cardExpirationDate?: string;
    cardSecurityCode?: string;
    nameOnCard?: string;
    saveInformation?: boolean;
    sessionId?: string;
  }
  
  export interface CheckoutSession {
    id: string;
    cartId: string;
    userId?: string;
    sessionId?: string;
    status: 'active' | 'completed' | 'abandoned';
    step: number;
    contactInformation?: {
      email?: string;
      mobileNumber?: string;
    };
    deliveryInformation?: {
      country: string;
      firstName: string;
      lastName: string;
      address: string;
      apartment?: string;
      city: string;
      postalCode?: string;
      phoneNumber: string;
      shippingMethod: string;
      shippingCost: number;
      saveInformation: boolean;
    };
    paymentInformation?: {
      paymentMethod: 'credit' | 'easypaisa' | 'cash';
      cardNumber?: string;
      cardExpirationDate?: string;
      cardSecurityCode?: string;
      nameOnCard?: string;
      saveInformation: boolean;
    };
    cart?: any;
    createdAt: string;
    updatedAt: string;
    expiredAt?: string;
  }
  
  export interface StartCheckoutResponse extends CheckoutSession {}
  
  // types/orderTypes.ts
  export interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    postalCode?: string;
    country: string;
    phone: string;
  }
  
  export interface CreateOrderData {
    paymentMethod: 'credit' | 'easypaisa' | 'cash';
    shippingAddress: ShippingAddress;
    notes?: string;
  }
  
  export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    productImage?: string;
    quantity: number;
    price: number;
    originalPrice?: number;
    totalPrice: number;
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
    paymentMethod: 'credit' | 'easypaisa' | 'cash';
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    paymentTransactionId?: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    notes?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface OrderResponse {
    success: boolean;
    message: string;
    payload?: Order;
  }