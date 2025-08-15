// src/pages/user-prescription/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { usePrescription } from '@/hooks/prescription.hooks';
import { Prescription } from '@/types/prescription.types';
import { MdArrowBack } from 'react-icons/md';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/auth.hook';

// Dynamically import ImageViewer to avoid SSR issues
const ImageViewer = dynamic(() => import('@/components/common/ImageViewer'), {
  ssr: false,
});

const PrescriptionDetailPage: React.FC = () => {
  const router = useRouter();
  const { getPrescription, isLoading } = usePrescription();
  const { isAuthenticated } = useAuth();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && router.query.id && typeof router.query.id === 'string') {
      loadPrescription(router.query.id);
    }
  }, [router.query.id, isAuthenticated]);

  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
  };

  const loadPrescription = async (prescriptionId: string) => {
    try {
      const response = await getPrescription(prescriptionId);
      if (response?.data) {
        setPrescription(response.data);
      }
    } catch (error) {
      console.error('Error loading prescription:', error);
      setError('Failed to load prescription details.');
    }
  };

  const handleGoBack = () => {
    if (isClient) {
      router.push('/user/prescriptions');
    }
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  // Redirect handling - only do this client-side
  useEffect(() => {
    if (isClient && !isAuthenticated && !isLoading) {
      router.push('/auth/login');
    }
  }, [isClient, isAuthenticated, isLoading, router]);

  // Skeleton loader for prescription details
  const DetailSkeleton = () => (
    <div className="bg-white rounded-lg shadow-lg animate-pulse">
      <div className="bg-gray-100 px-6 py-4 border-b">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Prescription Image */}
          <div>
            <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-10 bg-gray-200 rounded-lg mt-4"></div>
          </div>

          {/* Right column - Details */}
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              
              <div className="border-b pb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              
              <div className="border-b pb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-primary"
            type="button"
          >
            <MdArrowBack className="mr-1" size={20} />
            <span>Back to Prescriptions</span>
          </button>
        </div>

        {isLoading ? (
          <DetailSkeleton />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
            <button 
              onClick={handleGoBack}
              className="mt-2 text-primary hover:underline"
              type="button"
            >
              Return to Prescriptions
            </button>
          </div>
        ) : prescription ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with status */}
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                Prescription #{prescription.prescriptionNumber}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(prescription.status)}`}>
                {prescription.status === 'in progress' 
                  ? 'Processing' 
                  : prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column - Prescription Image */}
                <div>
                  <div 
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer bg-gray-50 border"
                    onClick={() => setShowImageViewer(true)}
                  >
                    <img 
                      src={prescription.url} 
                      alt="Prescription" 
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/prescription-placeholder.jpg';
                      }}
                    />
                    <div className="bg-gray-50 text-center py-2 text-sm text-gray-500 border-t">
                      Click to enlarge
                    </div>
                  </div>
                  
                  <button
                    onClick={() => window.open(prescription.url, '_blank')}
                    className="mt-4 w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                    type="button"
                  >
                    Download Prescription
                  </button>
                </div>

                {/* Right column - Prescription Details */}
                <div>
                  <h2 className="text-lg font-medium mb-4">Prescription Details</h2>
                  
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="text-sm text-gray-500 mb-1">Patient Information</h3>
                      <p className="font-medium">{prescription.fullName}</p>
                      {prescription.email && <p>{prescription.email}</p>}
                      {prescription.phone && <p>{prescription.phone}</p>}
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="text-sm text-gray-500 mb-1">Delivery Address</h3>
                      <p>{prescription.address}</p>
                      <p>
                        {prescription.city}
                        {prescription.state ? `, ${prescription.state}` : ''}
                        {prescription.postalCode ? ` ${prescription.postalCode}` : ''}
                      </p>
                      <p>{prescription.country || 'Pakistan'}</p>
                      
                      {prescription.addressNotes && (
                        <div className="mt-2">
                          <h4 className="text-xs text-gray-500">Address Notes</h4>
                          <p className="text-sm">{prescription.addressNotes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-b pb-4">
                      <h3 className="text-sm text-gray-500 mb-1">Submission Details</h3>
                      <p>Date: {formatDate(prescription.createdAt)}</p>
                      <p>Status: <span className="font-medium">
                        {prescription.status === 'in progress' 
                          ? 'Processing' 
                          : prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                      </span></p>
                    </div>
                    
                    {prescription.notes && (
                      <div>
                        <h3 className="text-sm text-gray-500 mb-1">Notes</h3>
                        <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-line">
                          {prescription.notes}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-12">
            <p>No prescription found</p>
          </div>
        )}
      </div>

      {/* Image Viewer - only rendered client-side */}
      {isClient && prescription && showImageViewer && (
        <ImageViewer
          imageUrl={prescription.url || ''}
          isOpen={showImageViewer}
          onClose={handleCloseImageViewer}
        />
      )}
    </Layout>
  );
};

export default PrescriptionDetailPage;