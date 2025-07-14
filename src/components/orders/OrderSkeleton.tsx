
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const OrderListSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <Skeleton width={200} height={32} />
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array(5).fill(0).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">
                    <Skeleton width={80} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={120} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={100} height={28} borderRadius={14} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={90} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={100} height={36} borderRadius={6} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const OrderDetailSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <Skeleton width={300} height={32} />
        <Skeleton width={120} height={40} borderRadius={8} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Skeleton width={150} height={24} className="mb-4" />
          <Skeleton count={4} className="mb-2" />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Skeleton width={150} height={24} className="mb-4" />
          <Skeleton count={4} className="mb-2" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b">
          <Skeleton width={200} height={24} />
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
              {Array(3).fill(0).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-16 h-16 mr-3">
                        <Skeleton width={64} height={64} />
                      </div>
                      <div>
                        <Skeleton width={180} className="mb-1" />
                        <Skeleton width={120} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={80} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={40} />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton width={90} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md ml-auto">
        <Skeleton width={150} height={24} className="mb-4" />
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex justify-between">
            <Skeleton width={100} />
            <Skeleton width={80} />
          </div>
          <div className="flex justify-between">
            <Skeleton width={80} />
            <Skeleton width={80} />
          </div>
          <div className="flex justify-between">
            <Skeleton width={120} />
            <Skeleton width={80} />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold">
            <Skeleton width={80} height={24} />
            <Skeleton width={100} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};