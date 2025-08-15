// // src/components/prescription/PrescriptionDetailView.tsx (Updated with Image Viewer)
// import React, { useState } from 'react';
// import Modal from '@/components/common/Modal';
// import Button from '@/components/common/Button';
// import ImageViewer from '@/components/common/ImageViewer';
// import { Prescription } from '@/types/prescription.types';
// import PrescriptionStatusDropdown from './PrescriptionStatusDropdown';

// interface PrescriptionDetailViewProps {
//   prescription: Prescription | null;
//   show: boolean;
//   onClose: () => void;
//   onUpdateStatus?: (prescriptionId: string, newStatus: string) => Promise<void>;
//   isAdmin?: boolean;
// }

// const PrescriptionDetailView: React.FC<PrescriptionDetailViewProps> = ({
//   prescription,
//   show,
//   onClose,
//   onUpdateStatus,
//   isAdmin = false,
// }) => {
//   const [showImageViewer, setShowImageViewer] = useState(false);

//   if (!prescription) return null;

//   const formatDate = (dateString: string | Date | undefined) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const getStatusBadgeClass = (status: string): string => {
//     switch (status) {
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'approved':
//         return 'bg-blue-100 text-blue-800';
//       case 'in progress':
//         return 'bg-purple-100 text-purple-800';
//       case 'delivered':
//         return 'bg-green-100 text-green-800';
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Format status for display
//   const displayStatus = prescription.status === 'in progress' 
//     ? 'Processing' 
//     : prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1);

//   const handleOpenImageViewer = () => {
//     setShowImageViewer(true);
//   };

//   const handleCloseImageViewer = () => {
//     setShowImageViewer(false);
//   };

//   const handleUpdatePrescriptionStatus = async (prescriptionId: string, newStatus: string) => {
//     if (onUpdateStatus) {
//       await onUpdateStatus(prescriptionId, newStatus);
//     }
//   };

//   return (
//     <>
//       <Modal show={show} onClose={onClose}>
//         <div className="w-full p-5">
//           <h2 className="text-xl font-medium mb-4">Prescription Details</h2>
          
//           <div className="mb-6">
//             <div 
//               className="rounded-lg overflow-hidden shadow-md mb-4 bg-gray-100 cursor-pointer"
//               onClick={handleOpenImageViewer}
//             >
//               <img 
//                 src={prescription.url} 
//                 alt="Prescription" 
//                 className="w-full h-auto object-contain max-h-64"
//               />
//               <div className="bg-gray-100 text-center py-1 text-sm text-gray-500">
//                 Click to enlarge
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-sm text-gray-500">{prescription.prescriptionNumber}</span>
//               {isAdmin ? (
//                 <PrescriptionStatusDropdown
//                   currentStatus={prescription.status}
//                   prescriptionId={prescription.id}
//                   onUpdate={handleUpdatePrescriptionStatus}
//                 />
//               ) : (
//                 <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(prescription.status)}`}>
//                   {displayStatus}
//                 </span>
//               )}
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <p className="text-sm text-gray-500">Full Name</p>
//                 <p className="font-medium">{prescription.fullName}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Submitted On</p>
//                 <p>{formatDate(prescription.createdAt)}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Contact Email</p>
//                 <p>{prescription.email || 'N/A'}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Contact Phone</p>
//                 <p>{prescription.phone || 'N/A'}</p>
//               </div>
//               <div className="col-span-2">
//                 <p className="text-sm text-gray-500">Delivery Address</p>
//                 <p>
//                   {prescription.address}, {prescription.city}
//                   {prescription.state ? `, ${prescription.state}` : ''} 
//                   {prescription.postalCode ? ` ${prescription.postalCode}` : ''}
//                   {prescription.country ? `, ${prescription.country}` : ''}
//                 </p>
//               </div>
              
//               {prescription.addressNotes && (
//                 <div className="col-span-2">
//                   <p className="text-sm text-gray-500">Address Notes</p>
//                   <p className="text-sm">{prescription.addressNotes}</p>
//                 </div>
//               )}
//             </div>
            
//             {isAdmin && prescription.user && (
//               <div className="bg-gray-50 p-3 rounded mb-4">
//                 <p className="text-sm text-gray-500 mb-1">Patient Account</p>
//                 <p className="font-medium">
//                   {prescription.user.firstName} {prescription.user.lastName} ({prescription.user.email})
//                 </p>
//               </div>
//             )}
            
//             {prescription.notes && (
//               <div className="mt-4">
//                 <p className="text-sm text-gray-500">Notes</p>
//                 <p className="whitespace-pre-line bg-gray-50 p-3 rounded">{prescription.notes}</p>
//               </div>
//             )}
            
//             {isAdmin && prescription.verifiedBy && prescription.verifier && (
//               <div className="mt-4 bg-blue-50 p-3 rounded">
//                 <p className="text-sm text-blue-700 mb-1">Verified By</p>
//                 <p className="text-sm">
//                   {prescription.verifier.firstName} {prescription.verifier.lastName} 
//                   ({prescription.verifier.email})
//                 </p>
//               </div>
//             )}
//           </div>
          
//           <div className="flex justify-end gap-3">
//             <Button
//               label="Close"
//               className="max-w-[100px]"
//               onClick={onClose}
//             />
            
//             <Button
//               label="Download"
//               className="max-w-[120px]"
//               onClick={() => window.open(prescription.url, '_blank')}
//             />
//           </div>
//         </div>
//       </Modal>
      
//       {/* Image Viewer Component */}
//       <ImageViewer 
//         imageUrl={prescription.url}
//         alt={`Prescription: ${prescription.prescriptionNumber}`}
//         isOpen={showImageViewer}
//         onClose={handleCloseImageViewer}
//       />
//     </>
//   );
// };

// export default PrescriptionDetailView;
// src/components/prescription/PrescriptionDetailView.tsx (Updated with Image Viewer)
import React, { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { Prescription } from '@/types/prescription.types';
import PrescriptionStatusDropdown from './PrescriptionStatusDropdown';
import ImageViewer from './common/ImageViewer';

interface PrescriptionDetailViewProps {
  prescription: Prescription | null;
  show: boolean;
  onClose: () => void;
  onUpdateStatus?: (prescriptionId: string, newStatus: string) => Promise<void>;
  isAdmin?: boolean;
}

const PrescriptionDetailView: React.FC<PrescriptionDetailViewProps> = ({
  prescription,
  show,
  onClose,
  onUpdateStatus,
  isAdmin = false,
}) => {
  const [showImageViewer, setShowImageViewer] = useState(false);

  if (!prescription) return null;

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  const handleOpenImageViewer = () => {
    console.log('Opening image viewer for:', prescription.url);
    setShowImageViewer(true);
  };

  const handleCloseImageViewer = () => {
    setShowImageViewer(false);
  };

  const handleUpdatePrescriptionStatus = async (prescriptionId: string, newStatus: string) => {
    if (onUpdateStatus) {
      await onUpdateStatus(prescriptionId, newStatus);
    }
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <div className="w-full p-5">
          <h2 className="text-xl font-medium mb-4">Prescription Details</h2>
          
          <div className="mb-6">
            <div 
              className="rounded-lg overflow-hidden shadow-md mb-4 bg-gray-100 cursor-pointer"
              onClick={handleOpenImageViewer}
            >
              <img 
                src={prescription.url} 
                alt="Prescription" 
                className="w-full h-auto object-contain max-h-64"
                onError={(e) => {
                  console.error('Error loading thumbnail:', prescription.url);
                  (e.target as HTMLImageElement).src = '/images/prescription-placeholder.jpg';
                }}
              />
              <div className="bg-gray-100 text-center py-1 text-sm text-gray-500">
                Click to enlarge (URL: {prescription.url?.substring(0, 30)}...)
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{prescription.prescriptionNumber}</span>
              {isAdmin ? (
                <PrescriptionStatusDropdown
                  currentStatus={prescription.status}
                  prescriptionId={prescription.id}
                  onUpdate={handleUpdatePrescriptionStatus}
                />
              ) : (
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(prescription.status)}`}>
                  {displayStatus}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{prescription.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Submitted On</p>
                <p>{formatDate(prescription.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Email</p>
                <p>{prescription.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Phone</p>
                <p>{prescription.phone || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Delivery Address</p>
                <p>
                  {prescription.address}, {prescription.city}
                  {prescription.state ? `, ${prescription.state}` : ''} 
                  {prescription.postalCode ? ` ${prescription.postalCode}` : ''}
                  {prescription.country ? `, ${prescription.country}` : ''}
                </p>
              </div>
              
              {prescription.addressNotes && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address Notes</p>
                  <p className="text-sm">{prescription.addressNotes}</p>
                </div>
              )}
            </div>
            
            {isAdmin && prescription.user && (
              <div className="bg-gray-50 p-3 rounded mb-4">
                <p className="text-sm text-gray-500 mb-1">Patient Account</p>
                <p className="font-medium">
                  {prescription.user.firstName} {prescription.user.lastName} ({prescription.user.email})
                </p>
              </div>
            )}
            
            {prescription.notes && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="whitespace-pre-line bg-gray-50 p-3 rounded">{prescription.notes}</p>
              </div>
            )}
            
            {isAdmin && prescription.verifiedBy && prescription.verifier && (
              <div className="mt-4 bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-700 mb-1">Verified By</p>
                <p className="text-sm">
                  {prescription.verifier.firstName} {prescription.verifier.lastName} 
                  ({prescription.verifier.email})
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              label="Close"
              className="max-w-[100px]"
              onClick={onClose}
            />
            
            <Button
              label="View Image"
              className="max-w-[120px]"
              onClick={handleOpenImageViewer}
            />
            
            <Button
              label="Download"
              className="max-w-[120px]"
              onClick={() => window.open(prescription.url, '_blank')}
            />
          </div>
        </div>
      </Modal>
      
      {/* Image Viewer Component */}
      <ImageViewer
        imageUrl={prescription.url || ''}
        isOpen={showImageViewer}
        onClose={handleCloseImageViewer}
      />
    </>
  );
};

export default PrescriptionDetailView;
