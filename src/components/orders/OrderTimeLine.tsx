// src/components/orders/OrderTimeLine.tsx
import React from 'react';
import {
  FaCheckCircle,
  FaTruck,
  FaBox,
  FaClipboardCheck,
  FaTimesCircle,
} from 'react-icons/fa';

interface OrderTimelineProps {
  status: string;
  className?: string;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({
  status,
  className = '',
}) => {
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const currentIndex = statuses.indexOf(status?.toLowerCase());

  if (status?.toLowerCase() === 'cancelled') {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-4 text-center ${className}`}
      >
        <div className="flex items-center justify-center mb-2">
          <FaTimesCircle className="text-red-600 text-xl mr-2" />
          <h3 className="text-red-700 font-medium">
            This order has been cancelled
          </h3>
        </div>
        <p className="text-red-600 text-sm">
          If you have any questions, please contact customer support.
        </p>
      </div>
    );
  }

  if (status?.toLowerCase() === 'refunded') {
    return (
      <div
        className={`bg-blue-50 border border-blue-200 rounded-lg p-4 text-center ${className}`}
      >
        <div className="flex items-center justify-center mb-2">
          <FaCheckCircle className="text-blue-600 text-xl mr-2" />
          <h3 className="text-blue-700 font-medium">
            This order has been refunded
          </h3>
        </div>
        <p className="text-blue-600 text-sm">
          The refund has been processed. If you have any questions, please
          contact customer support.
        </p>
      </div>
    );
  }

  // Icons for each status
  const statusIcons = [
    <FaClipboardCheck key="pending" />,
    <FaBox key="processing" />,
    <FaTruck key="shipped" />,
    <FaCheckCircle key="delivered" />,
  ];

  // Labels for each status
  const statusLabels = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

  // Descriptions for each status
  const statusDescriptions = [
    'Your order has been placed and is being reviewed',
    'Your order is being processed and prepared for shipping',
    'Your order has been shipped and is on the way',
    'Your order has been delivered successfully',
  ];

  return (
    <div className={`mb-8 mt-6 ${className}`}>
      {/* Mobile Timeline (Stack View) - Show on small screens only */}
      <div className="md:hidden">
        <div className="space-y-6">
          {statuses.map((step, index) => (
            <div
              key={step}
              className={`flex items-start ${index <= currentIndex ? '' : 'opacity-50'}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${
                  index <= currentIndex
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {statusIcons[index]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{statusLabels[index]}</div>
                {index <= currentIndex && (
                  <div className="text-xs text-gray-500 mt-1">
                    {statusDescriptions[index]}
                  </div>
                )}
              </div>
              {/* Connector line except for the last item */}
              {index < statuses.length - 1 && (
                <div className="absolute h-10 w-0.5 bg-gray-200 left-5 ml-[4px] mt-10">
                  <div
                    className={`h-full w-full ${index < currentIndex ? 'bg-primary' : 'bg-gray-200'}`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Timeline (Horizontal View) - Hide on small screens */}
      <div className="hidden md:block relative">
        <div className="relative flex items-center justify-between mb-4">
          {statuses.map((step, index) => (
            <div
              key={step}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index <= currentIndex
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {statusIcons[index]}
              </div>
              <div className="text-sm mt-2 font-medium">
                {statusLabels[index]}
              </div>
              <div className="text-xs text-gray-500 text-center mt-1 max-w-[120px]">
                {index <= currentIndex ? (
                  <span>{statusDescriptions[index]}</span>
                ) : null}
              </div>
            </div>
          ))}

          {/* Connecting lines */}
          <div className="absolute h-0.5 bg-gray-200 w-full top-6 -z-0"></div>
          <div
            className="absolute h-0.5 bg-primary top-6 -z-0"
            style={{
              width: `${currentIndex > 0 ? (currentIndex / (statuses.length - 1)) * 100 : 0}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Current status message - Both mobile and desktop */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium text-lg mb-2">
          Order Status: {statusLabels[Math.max(0, currentIndex)]}
        </h3>
        <p className="text-gray-600">
          {currentIndex === 0 &&
            'Your order has been received and is now being reviewed.'}
          {currentIndex === 1 &&
            'We are currently processing your order and preparing it for shipment.'}
          {currentIndex === 2 &&
            'Good news! Your order has been shipped and is on its way to you.'}
          {currentIndex === 3 &&
            'Your order has been delivered. We hope you enjoy your purchase!'}
        </p>

        {currentIndex === 2 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start">
            <FaTruck className="text-blue-700 mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="text-blue-700 font-medium">Shipping Information</p>
              <p className="text-sm text-blue-600">
                You can track your package using the tracking number provided in
                your order details.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTimeline;
