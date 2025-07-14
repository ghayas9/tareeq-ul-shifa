// src/components/CheckoutSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CheckoutSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6">
        <Skeleton width={250} height={20} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Checkout Form Skeleton */}
        <div className="w-full lg:w-2/3">
          {/* Step 1 Skeleton */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <div className="flex items-center mb-4">
              <Skeleton circle width={32} height={32} className="mr-3" />
              <Skeleton width={100} height={24} />
            </div>
            <Skeleton height={40} className="mb-4" />
            <div className="flex justify-end">
              <Skeleton width={150} height={40} borderRadius={8} />
            </div>
          </div>

          {/* Step 2 Skeleton */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <div className="flex items-center mb-4">
              <Skeleton circle width={32} height={32} className="mr-3" />
              <Skeleton width={100} height={24} />
            </div>
            <Skeleton height={40} className="mb-4" count={6} />
            <div className="flex justify-end">
              <Skeleton width={150} height={40} borderRadius={8} />
            </div>
          </div>

          {/* Step 3 Skeleton */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <div className="flex items-center mb-4">
              <Skeleton circle width={32} height={32} className="mr-3" />
              <Skeleton width={100} height={24} />
            </div>
            <Skeleton height={60} className="mb-4" count={3} />
            <div className="flex justify-end">
              <Skeleton width={150} height={40} borderRadius={8} />
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary Skeleton */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <Skeleton width={150} height={24} className="mb-6" />
            <div className="mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center mb-4 pb-4 border-b">
                  <Skeleton width={80} height={80} className="mr-4" />
                  <div className="flex-1">
                    <Skeleton width={150} height={20} className="mb-2" />
                    <Skeleton width={100} height={16} className="mb-2" />
                    <Skeleton width={120} height={16} />
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Skeleton */}
            <div className="mb-6">
              <Skeleton height={40} borderRadius={8} />
            </div>

            {/* Order Totals Skeleton */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <Skeleton width={100} />
                <Skeleton width={60} />
              </div>
              <div className="flex justify-between mb-2">
                <Skeleton width={80} />
                <Skeleton width={60} />
              </div>
              <div className="flex justify-between mb-2">
                <Skeleton width={80} />
                <Skeleton width={60} />
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                <Skeleton width={60} />
                <Skeleton width={80} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
