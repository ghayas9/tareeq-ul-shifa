
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { usePrescription } from '@/hooks/prescription.hooks';
import { Prescription, PrescriptionFilterParams } from '@/types/prescription.types';
import { useAuth } from '@/hooks/auth.hook';
import PrescriptionUploadButton from '@/components/PrescriptionUploadButton';

const UserPrescriptionsPage = () => {
  const router = useRouter();
  const { getUserPrescriptions, isLoading } = usePrescription();
  const { isAuthenticated } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [currentFilters, setCurrentFilters] = useState<PrescriptionFilterParams>({
    limit: 10,
    offset: 0
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadPrescriptions();
    }
  }, [isAuthenticated]);

  const loadPrescriptions = async (filters?: PrescriptionFilterParams) => {
    try {
      const mergedFilters = { ...currentFilters, ...filters };
      setCurrentFilters(mergedFilters);
      const response = await getUserPrescriptions(mergedFilters);
      if (response?.data) {
        setPrescriptions(response.data);
      }
    } catch (error) {
      console.error('Error loading prescriptions:', error);
    }
  };

  const handleViewPrescription = (prescriptionId: string) => {
    router.push(`/user-prescription/${prescriptionId}`);
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  // Skeleton loader for prescriptions
  const PrescriptionSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/5"></div>
          </div>
        </div>
      ))}
    </>
  );

  // If not authenticated, redirect to login
  // if (!isAuthenticated && !isLoading) {
  //   router.push('/auth/login');
  //   return null;
  // }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Prescriptions</h1>
          <PrescriptionUploadButton className="justify-end" />
        </div>
        
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PrescriptionSkeleton />
          </div>
        ) : prescriptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't uploaded any prescriptions yet</p>
            <PrescriptionUploadButton className="justify-center" />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prescriptions.map((prescription) => (
              <div 
                key={prescription.id} 
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => handleViewPrescription(prescription.id)}
              >
                <div className="mb-2 flex justify-between items-start">
                  <span className="text-sm text-gray-500">{prescription.prescriptionNumber}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(prescription.status)}`}>
                    {prescription.status === 'in progress' ? 'Processing' : prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
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
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserPrescriptionsPage;