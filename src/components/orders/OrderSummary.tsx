import React from 'react';
import { Order } from '@/types/orderTypes';

interface OrderSummaryProps {
  order: Order;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  className = '',
}) => {
  console.log(order, 'order');

  const formatAmount = (amount: any): string => {
    if (amount == null) return '0.00';

    if (typeof amount === 'number') return amount.toFixed(2);

    const parsed = parseFloat(amount);
    return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>Rs {formatAmount(order.subtotalAmount)}</span>
        </div>

        {order.discountAmount &&
          parseFloat(formatAmount(order.discountAmount)) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-Rs {formatAmount(order.discountAmount)}</span>
            </div>
          )}

        {order.couponCode && (
          <div className="flex justify-between items-center text-blue-600">
            <span className="flex items-center">
              <span className="text-xs px-2 py-1 bg-blue-100 rounded-full mr-2">
                {order.couponCode}
              </span>
              Coupon Applied
            </span>
            <span>-Rs {formatAmount(order.discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>Rs {formatAmount(order.shippingAmount)}</span>
        </div>

        {/* You can add tax information here if available */}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-primary text-xl">
            Rs {formatAmount(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-6 pt-4 border-t">
        <h3 className="font-medium mb-2">Payment Information</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Payment Method</span>
          <span className="font-medium text-gray-800">
            {order.paymentMethod === 'credit'
              ? 'Credit/Debit Card'
              : order.paymentMethod === 'easypaisa'
                ? 'EasyPaisa'
                : 'Cash on Delivery'}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>Payment Status</span>
          <span
            className={`font-medium ${
              order.paymentStatus === 'paid'
                ? 'text-green-600'
                : order.paymentStatus === 'pending'
                  ? 'text-yellow-600'
                  : 'text-red-600'
            }`}
          >
            {order.paymentStatus
              ? order.paymentStatus.charAt(0).toUpperCase() +
                order.paymentStatus.slice(1)
              : 'Unknown'}
          </span>
        </div>
        {order.paymentTransactionId && (
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Transaction ID</span>
            <span className="font-medium text-gray-800">
              {order.paymentTransactionId}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
