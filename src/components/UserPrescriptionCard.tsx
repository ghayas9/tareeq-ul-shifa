// src/components/prescription/UserPrescriptionCard.tsx
import React from 'react';
import { Prescription } from '@/types/prescription.types';

interface UserPrescriptionCardProps {
  prescription: Prescription;
  onClick: (prescription: Prescription) => void;
}

const UserPrescriptionCard: React.FC<UserPrescriptionCardProps> = ({ 
  prescription, 
  onClick 
}) => {
  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format status for display
  const displayStatus = prescription.status === 'in progress' 
    ? 'Processing' 
    : prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1);

  return (
    <div 
      className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer"
      onClick={() => onClick(prescription)}
    >
      <div className="mb-2 flex justify-between items-start">
        <span className="text-sm text-gray-500">{prescription.prescriptionNumber}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(prescription.status)}`}>
          {displayStatus}
        </span>
      </div>
      
      <h3 className="font-medium mb-1">{prescription.fullName}</h3>
      
      <p className="text-sm text-gray-600 mb-2">
        {prescription.address}, {prescription.city}
      </p>
      
      <div className="relative w-full h-32 mb-3 overflow-hidden rounded bg-gray-100">
        <img 
          src={prescription.url} 
          alt="Prescription" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/prescription-placeholder.jpg';
          }}
        />
      </div>
      
      <div className="text-sm text-gray-500">
        Submitted: {formatDate(prescription.createdAt)}
      </div>
    </div>
  );
};

export default UserPrescriptionCard;