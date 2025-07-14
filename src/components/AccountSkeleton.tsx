// src/components/profile/ProfileSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProfileFormSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton width={200} height={28} />
        <Skeleton width={80} height={24} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Fields */}
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="mb-4">
            <Skeleton width={120} height={20} className="mb-2" />
            <Skeleton height={44} className="rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SecurityFormSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton width={220} height={28} />
        <Skeleton width={140} height={24} />
      </div>
      
      <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
        <Skeleton width={220} height={20} className="mb-4" />
        
        <div className="mt-4 space-y-4">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <Skeleton width={150} height={20} />
              <Skeleton width={80} height={22} className="rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PasswordFormSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {Array(3).fill(0).map((_, index) => (
        <div key={index} className="mb-4">
          <Skeleton width={150} height={20} className="mb-2" />
          <Skeleton height={44} className="rounded-md" />
        </div>
      ))}
      
      <div className="mt-6 flex justify-end">
        <Skeleton width={150} height={40} className="rounded-lg" />
      </div>
    </div>
  );
};