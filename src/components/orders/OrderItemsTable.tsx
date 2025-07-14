// src/components/orders/OrderItemsTable.tsx
import React from 'react';
import Image from 'next/image';
import { OrderItem } from '@/types/orderTypes';

interface OrderItemsTableProps {
  items: OrderItem[];
  className?: string;
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({
  items,
  className = '',
}) => {
  const formatAmount = (amount: any): string => {
    if (amount == null) return '0.00';
    if (typeof amount === 'number') return amount.toFixed(2);
    const parsed = parseFloat(amount);
    return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
  };

  if (!items || items.length === 0) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md p-6 text-center ${className}`}
      >
        <p className="text-gray-500">No items in this order</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Order Items</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {item.productImage && (
                      <div className="relative w-16 h-16 mr-3">
                        <Image
                          src={item.productImage}
                          alt={item.productName}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-md"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{item.productName}</div>
                      {item.product?.brand && (
                        <p className="text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">Rs {formatAmount(item.price)}</td>
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3 font-medium">
                  Rs {formatAmount(item.totalPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Items Count */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Items: {items.length}</span>
          <span className="text-gray-600">
            {items.reduce(
              (total, item) =>
                total +
                (typeof item.quantity === 'number'
                  ? item.quantity
                  : parseInt(item.quantity) || 0),
              0
            )}{' '}
            units
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsTable;
