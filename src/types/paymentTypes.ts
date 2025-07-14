export interface CreditCardPaymentData {
  cardNumber: string;
  cardExpirationDate: string;
  cardSecurityCode: string;
  nameOnCard: string;
}

export interface EasyPaisaPaymentData {
  mobileNumber: string;
}

export interface PaymentResponse {
  success: boolean;
  orderId: string;
  transactionId?: string;
  paymentMethod: 'credit' | 'easypaisa' | 'cash';
  maskedCardNumber?: string;
  amount: number;
  message: string;
  checkStatusUrl?: string;
}

export interface EasyPaisaStatusResponse {
  transactionId: string;
  status: 'INITIATED' | 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';
  message: string;
  lastUpdated: string;
}