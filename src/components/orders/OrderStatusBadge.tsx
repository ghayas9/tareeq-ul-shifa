
import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
  className?: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const formattedStatus = status && status.length > 0 
  ? status.charAt(0).toUpperCase() + status.slice(1)
  : 'Unknown';
  return (
    <span 
      className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(status)} ${className}`}
    >
      {formattedStatus}
    </span>
  );
};

export default OrderStatusBadge;