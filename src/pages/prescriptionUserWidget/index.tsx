// src/components/user/dashboard/UserPrescriptionWidget.tsx
import React, { useEffect, useState } from 'react';
import { usePrescription } from '@/hooks/prescription.hooks';
import { Prescription } from '@/types/prescription.types';
import { MdLocalPharmacy } from 'react-icons/md';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import PrescriptionUploadButton from '@/components/PrescriptionUploadButton';

const UserPrescriptionWidget: React.FC = () => {
  const router = useRouter();
  const { getUserPrescriptions, isLoading } = usePrescription();
  const [recentPrescriptions, setRecentPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await getUserPrescriptions({
        limit: 3,
        offset: 0
      });
      
      if (response?.data) {
        setRecentPrescriptions(response.data);
      }
    } catch (error) {
      console.error('Error loading user prescriptions:', error);
    }
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleViewAll = () => {
    router.push('/user/prescriptions');
  };

  const getStatusClass = (status: string) => {
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
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Format status for display
  const formatStatus = (status: string) => {
    return status === 'in progress' 
      ? 'Processing' 
      : status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <MdLocalPharmacy className="text-primary text-xl mr-2" />
          <h2 className="text-lg font-medium">My Prescriptions</h2>
        </div>
        <button 
          className="text-sm text-primary hover:underline"
          onClick={handleViewAll}
        >
          View All
        </button>
      </div>

      {/* Recent prescriptions */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : recentPrescriptions.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4">You haven't uploaded any prescriptions yet</p>
          <PrescriptionUploadButton className="justify-center" />
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {recentPrescriptions.map(prescription => (
              <div 
                key={prescription.id} 
                className="flex items-center justify-between border-b pb-3 cursor-pointer hover:bg-gray-50 px-2 rounded"
                onClick={() => router.push(`/user/prescriptions?id=${prescription.id}`)}
              >
                <div className="flex items-center">
                  <div className="mr-3 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={prescription.url} 
                      alt="Prescription" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/prescription-placeholder.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{prescription.prescriptionNumber}</p>
                    <p className="text-xs text-gray-500">{formatDate(prescription.createdAt)}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getStatusClass(prescription.status)}`}>
                  {formatStatus(prescription.status)}
                </span>
              </div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <PrescriptionUploadButton className="justify-center" />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default UserPrescriptionWidget;
