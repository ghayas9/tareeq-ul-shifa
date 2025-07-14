
// src/components/orders/ShippingInfoCard.tsx
import { ShippingAddress } from '@/types/checkoutTypes';
import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';

interface ShippingInfoCardProps {
  shippingAddress: ShippingAddress;
  className?: string;
}

const ShippingInfoCard: React.FC<ShippingInfoCardProps> = ({ shippingAddress, className = '' }) => {
  console.log(shippingAddress,"shippingAddress")
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <FaUser className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Name</p>
            <p className="text-gray-600">{shippingAddress.name}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <FaMapMarkerAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Address</p>
            <p className="text-gray-600">{shippingAddress.address}</p>
            <p className="text-gray-600">
              {shippingAddress.city}
              {shippingAddress.postalCode && `, ${shippingAddress.postalCode}`}
            </p>
            <p className="text-gray-600">{shippingAddress.country}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <FaPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
          <div>
            <p className="font-medium">Contact</p>
            <p className="text-gray-600">{shippingAddress.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoCard;