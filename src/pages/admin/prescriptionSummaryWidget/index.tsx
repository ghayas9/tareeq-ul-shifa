
// src/components/admin/dashboard/PrescriptionSummaryWidget.tsx
import React, { useEffect, useState } from 'react';
import { usePrescription } from '@/hooks/prescription.hooks';
import { Prescription } from '@/types/prescription.types';
import { MdLocalPharmacy } from 'react-icons/md';
import { useRouter } from 'next/router';

const PrescriptionSummaryWidget: React.FC = () => {
  const router = useRouter();
  const { getAllPrescriptions, isLoading, stats, getPrescriptionStats } = usePrescription();
  const [recentPrescriptions, setRecentPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load stats
      await getPrescriptionStats();
      
      // Load recent prescriptions
      const response = await getAllPrescriptions({
        limit: 5,
        offset: 0
      });
      
      if (response?.data) {
        setRecentPrescriptions(response.data);
      }
    } catch (error) {
      console.error('Error loading dashboard prescription data:', error);
    }
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewAll = () => {
    router.push('/admin/prescriptions');
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

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <MdLocalPharmacy className="text-primary text-xl mr-2" />
          <h2 className="text-lg font-medium">Prescriptions</h2>
        </div>
        <button 
          className="text-sm text-primary hover:underline"
          onClick={handleViewAll}
        >
          View All
        </button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-blue-50 rounded p-3">
          <p className="text-sm text-blue-700">Total</p>
          <p className="text-xl font-bold text-blue-800">
            {isLoading ? '...' : stats?.total || 0}
          </p>
        </div>
        <div className="bg-yellow-50 rounded p-3">
          <p className="text-sm text-yellow-700">Pending</p>
          <p className="text-xl font-bold text-yellow-800">
            {isLoading ? '...' : stats?.pending || 0}
          </p>
        </div>
        <div className="bg-purple-50 rounded p-3">
          <p className="text-sm text-purple-700">Today</p>
          <p className="text-xl font-bold text-purple-800">
            {isLoading ? '...' : stats?.todayNew || 0}
          </p>
        </div>
      </div>

      {/* Recent prescriptions */}
      <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Prescriptions</h3>
      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : recentPrescriptions.length === 0 ? (
        <p className="text-sm text-gray-500 py-3">No recent prescriptions</p>
      ) : (
        <div className="space-y-2">
          {recentPrescriptions.map(prescription => (
            <div key={prescription.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="text-sm font-medium">{prescription.fullName}</p>
                <p className="text-xs text-gray-500">{formatDate(prescription.createdAt)}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${getStatusClass(prescription.status)}`}>
                {prescription.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionSummaryWidget;
