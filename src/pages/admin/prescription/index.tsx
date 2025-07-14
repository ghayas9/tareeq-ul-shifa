// import React, { useState, useEffect } from 'react';
// import Layout from '@/components/admin/layout/Layout';
// import Breadcrumbs from '@/components/admin/BreadCrumbs';
// import DynamicTable from '@/components/admin/Table';
// import ConfirmModal from '@/components/common/ConfirmModal';
// import Search from '@/components/common/Search';
// import toast from 'react-hot-toast';
// import { MdFileDownload, MdVisibility } from 'react-icons/md';
// import Modal from '@/components/common/Modal';
// import PrescriptionStatusDropdown from '@/components/PrescriptionStatusDropdown';

// interface BreadcrumbItem {
//   label: string;
//   href: string;
//   active?: boolean;
// }

// interface Prescription {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   image: string;
//   status: string;
//   createdAt: string;
// }

// // Mock data for prescriptions
// const MOCK_PRESCRIPTIONS = [
//   {
//     id: '1',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '+92 300 1234567',
//     image: '/images/prescription-1.jpg',
//     status: 'pending',
//     createdAt: '2025-04-30T12:30:00',
//   },
//   {
//     id: '2',
//     name: 'Sarah Smith',
//     email: 'sarah.smith@example.com',
//     phone: '+92 301 7654321',
//     image: '/images/prescription-2.jpg',
//     status: 'processing',
//     createdAt: '2025-04-29T15:45:00',
//   },
//   {
//     id: '3',
//     name: 'Ahmed Khan',
//     email: 'ahmed.khan@example.com',
//     phone: '+92 311 9876543',
//     image: '/images/prescription-3.jpg',
//     status: 'completed',
//     createdAt: '2025-04-28T09:15:00',
//   },
//   {
//     id: '4',
//     name: 'Fatima Ali',
//     email: 'fatima.ali@example.com',
//     phone: '+92 322 1234567',
//     image: '/images/prescription-4.jpg',
//     status: 'cancelled',
//     createdAt: '2025-04-27T14:20:00',
//   },
// ];

// const Prescription = () => {
//   const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
//   const [search, setSearch] = useState('');
//   const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS);
//   const [isLoading, setIsLoading] = useState(false);
//   const [processingId, setProcessingId] = useState<string | null>(null);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//   const [prescriptionToDelete, setPrescriptionToDelete] = useState<Prescription | null>(null);
//   const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
//   const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

//   useEffect(() => {
//     // Filter prescriptions based on search term
//     if (search) {
//       const filtered = prescriptions.filter(
//         (prescription) =>
//           prescription.name.toLowerCase().includes(search.toLowerCase()) ||
//           prescription.email.toLowerCase().includes(search.toLowerCase()) ||
//           prescription.phone.includes(search)
//       );
//       setFilteredPrescriptions(filtered);
//     } else {
//       setFilteredPrescriptions(prescriptions);
//     }
//   }, [prescriptions, search]);

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//   };

//   const handleViewPrescription = (prescription: Prescription) => {
//     setSelectedPrescription(prescription);
//     setShowPrescriptionModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowPrescriptionModal(false);
//     setSelectedPrescription(null);
//   };

//   const handleDelete = (prescription: Prescription) => {
//     setPrescriptionToDelete(prescription);
//     setShowDeleteConfirmation(true);
//   };

//   const confirmDelete = async () => {
//     if (prescriptionToDelete) {
//       setProcessingId(prescriptionToDelete.id);

//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         // Filter out the deleted prescription
//         setPrescriptions(prevPrescriptions =>
//           prevPrescriptions.filter(p => p.id !== prescriptionToDelete.id)
//         );

//         toast.success('Prescription deleted successfully');
//       } catch (error) {
//         console.error('Failed to delete prescription:', error);
//         toast.error('Failed to delete prescription');
//       } finally {
//         setProcessingId(null);
//         setShowDeleteConfirmation(false);
//         setPrescriptionToDelete(null);
//       }
//     }
//   };

//   const cancelDelete = () => {
//     setShowDeleteConfirmation(false);
//     setPrescriptionToDelete(null);
//   };

//   const updatePrescriptionStatus = async (prescriptionId: string, newStatus: string) => {
//     setProcessingId(prescriptionId);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Update the status
//       setPrescriptions(prevPrescriptions =>
//         prevPrescriptions.map(p =>
//           p.id === prescriptionId ? { ...p, status: newStatus } : p
//         )
//       );

//       toast.success(`Prescription status updated to ${newStatus}`);
//     } catch (error) {
//       console.error('Failed to update prescription status:', error);
//       toast.error('Failed to update status');
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   // Custom render function for status column
//   const renderStatus = (value: string, item: Prescription) => {
//     return (
//       <PrescriptionStatusDropdown
//         currentStatus={value}
//         prescriptionId={item.id}
//         onUpdate={updatePrescriptionStatus}
//         disabled={processingId === item.id}
//       />
//     );
//   };

//   const columns = [
//     {
//       header: 'Patient',
//       key: 'image',
//       type: 'image',
//     },
//     {
//       header: 'Email',
//       key: 'email',
//     },
//     {
//       header: 'Phone',
//       key: 'phone',
//     },
//     {
//       header: 'Status',
//       key: 'status',
//       render: renderStatus,
//     },
//     {
//       header: 'Submitted',
//       key: 'createdAt',
//       render: (value: string) => formatDate(value),
//     },
//   ];

//   const breadcrumbItems: BreadcrumbItem[] = [
//     { label: 'Dashboard', href: '/admin/dashboard' },
//     { label: 'Prescriptions', href: '/admin/prescriptions', active: true },
//   ];

//   return (
//     <Layout>
//       <div className="px-6 py-6 bg-gray-50 max-h-screen overflow-y-auto">
//         <Breadcrumbs items={breadcrumbItems} />

//         <div className="flex justify-between mb-6">
//           <div className="flex sm:flex-row items-center justify-between flex-col w-full">
//             <div className="flex items-center gap-4">
//               <Search
//                 value={search}
//                 placeholder="Search Prescriptions"
//                 onChange={handleSearchChange}
//                 inputClassName="!rounded-lg"
//                 searchBtnClassName="!rounded-r-lg"
//                 className="my-4 !max-w-xl"
//                 showButton={false}
//               />
//             </div>
//           </div>
//         </div>

//         <ConfirmModal
//           showDeleteConfirmation={showDeleteConfirmation}
//           cancelDelete={cancelDelete}
//           description="Are you sure you want to delete this prescription? This action cannot be undone."
//           confirmDelete={confirmDelete}
//         />

//         {/* Prescription View Modal */}
//         <Modal show={showPrescriptionModal} onClose={handleCloseModal}>
//           {selectedPrescription && (
//             <div className="w-full p-6">
//               <h2 className="text-xl font-medium mb-4">Prescription Details</h2>

//               <div className="mb-6">
//                 <div className="rounded-lg overflow-hidden shadow-md mb-4">
//                   <img
//                     src={selectedPrescription.image}
//                     alt="Prescription"
//                     className="w-full h-auto object-contain"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Patient Name</p>
//                     <p className="font-medium">{selectedPrescription.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Status</p>
//                     <PrescriptionStatusDropdown
//                       currentStatus={selectedPrescription.status}
//                       prescriptionId={selectedPrescription.id}
//                       onUpdate={updatePrescriptionStatus}
//                     />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Email</p>
//                     <p>{selectedPrescription.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Phone</p>
//                     <p>{selectedPrescription.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Submitted On</p>
//                     <p>{formatDate(selectedPrescription.createdAt)}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3">
//                 <button
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                   onClick={handleCloseModal}
//                 >
//                   Close
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
//                   onClick={() => window.open(selectedPrescription.image, '_blank')}
//                 >
//                   Download
//                 </button>
//               </div>
//             </div>
//           )}
//         </Modal>

//         <div className="bg-white rounded-lg">
// <DynamicTable
//   data={filteredPrescriptions}
//   columns={columns as any}
//   itemsPerPage={10}
//   onDelete={handleDelete}
//   onEdit={handleViewPrescription}
//   isLoading={isLoading}
//   isRowLoading={processingId as string}
//   showCheckbox={false}
//   emptyMessage="No prescriptions found"
// />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Prescription;

// src/pages/admin/prescriptions.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/admin/layout/Layout';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import DynamicTable from '@/components/admin/Table';
import ConfirmModal from '@/components/common/ConfirmModal';
import Search from '@/components/common/Search';
import Modal from '@/components/common/Modal';
import { usePrescription } from '@/hooks/prescription.hooks';
import {
  Prescription,
  PrescriptionFilterParams,
} from '@/types/prescription.types';
import toast from 'react-hot-toast';
import PrescriptionStatusDropdown from '@/components/PrescriptionStatusDropdown';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const AdminPrescriptionsPage = () => {
  const {
    prescriptions,
    meta,
    isLoading,
    getAllPrescriptions,
    updatePrescription,
  } = usePrescription();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('');
  const [currentFilters, setCurrentFilters] =
    useState<PrescriptionFilterParams>({
      limit: 10,
      offset: 0,
    });

  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] =
    useState<Prescription | null>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);

  useEffect(() => {
    // Load prescriptions on component mount
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async (filters?: PrescriptionFilterParams) => {
    try {
      const mergedFilters = { ...currentFilters, ...filters };
      setCurrentFilters(mergedFilters);
      await getAllPrescriptions(mergedFilters);
    } catch (error) {
      console.error('Error loading prescriptions:', error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearch = () => {
    loadPrescriptions({ ...currentFilters, search, offset: 0 });
  };

  const handleFilterByStatus = (status: string) => {
    setStatusFilter(status);
    loadPrescriptions({ ...currentFilters, status, offset: 0 });
  };

  const handleFilterByCity = (city: string) => {
    setCityFilter(city);
    loadPrescriptions({ ...currentFilters, city, offset: 0 });
  };

  const handlePageChange = (page: number) => {
    const offset = (page - 1) * (currentFilters.limit || 10);
    loadPrescriptions({ ...currentFilters, offset });
  };

  const handleViewPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleCloseModal = () => {
    setShowPrescriptionModal(false);
    setSelectedPrescription(null);
  };

  const handleDelete = (prescription: Prescription) => {
    setPrescriptionToDelete(prescription);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (prescriptionToDelete) {
      setProcessingId(prescriptionToDelete.id);

      try {
        // In a real app, you would call an API to delete
        // For now we'll just reload the prescriptions
        toast.success('Prescription deleted successfully');
        loadPrescriptions(currentFilters);
      } catch (error) {
        console.error('Failed to delete prescription:', error);
        toast.error('Failed to delete prescription');
      } finally {
        setProcessingId(null);
        setShowDeleteConfirmation(false);
        setPrescriptionToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setPrescriptionToDelete(null);
  };

  const handleUpdatePrescriptionStatus = async (
    prescriptionId: string,
    newStatus: string
  ) => {
    setProcessingId(prescriptionId);

    try {
      await updatePrescription(prescriptionId, {
        status: newStatus as any,
        notes: `Status changed to ${newStatus}`,
      });

      toast.success(`Prescription status updated to ${newStatus}`);
    } catch (error) {
      console.error('Failed to update prescription status:', error);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Custom render function for status column
  const renderStatus = (value: string, item: Prescription) => {
    return (
      <PrescriptionStatusDropdown
        currentStatus={value}
        prescriptionId={item.id}
        onUpdate={handleUpdatePrescriptionStatus}
        disabled={processingId === item.id}
      />
    );
  };

  const columns = [
    {
      header: 'Prescription #',
      key: 'prescriptionNumber',
    },
    {
      header: 'Patient',
      key: 'fullName',
    },
    {
      header: 'Email',
      key: 'email',
    },
    {
      header: 'Phone',
      key: 'phone',
    },
    {
      header: 'City',
      key: 'city',
    },
    {
      header: 'Status',
      key: 'status',
      render: renderStatus,
    },
    {
      header: 'Submitted',
      key: 'createdAt',
      render: (value: string) => formatDate(value),
    },
  ];

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Prescriptions', href: '/admin/prescriptions', active: true },
  ];

  return (
    <Layout>
      <div className="px-6 py-6 bg-gray-50 max-h-screen overflow-y-auto">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex justify-between mb-6">
          <div className="flex sm:flex-row items-center justify-between flex-col w-full">
            <div className="flex items-center gap-4">
              <Search
                value={search}
                placeholder="Search by name, email, phone, or prescription #"
                onChange={handleSearchChange}
                onSearch={handleSearch}
                inputClassName="!rounded-lg"
                searchBtnClassName="!rounded-r-lg"
                className="my-4 !max-w-xl"
              />

              {/* Status filter dropdown could be added here */}
            </div>
          </div>
        </div>

        <ConfirmModal
          showDeleteConfirmation={showDeleteConfirmation}
          cancelDelete={cancelDelete}
          description="Are you sure you want to delete this prescription? This action cannot be undone."
          confirmDelete={confirmDelete}
        />

        {/* Prescription View Modal */}
        <Modal show={showPrescriptionModal} onClose={handleCloseModal}>
          {selectedPrescription && (
            <div className="w-full p-6">
              <h2 className="text-xl font-medium mb-4">Prescription Details</h2>

              <div className="mb-6">
                <div className="rounded-lg overflow-hidden shadow-md mb-4">
                  <img
                    src={selectedPrescription.url}
                    alt="Prescription"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Prescription #</p>
                    <p className="font-medium">
                      {selectedPrescription.prescriptionNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="font-medium">
                      {selectedPrescription.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <PrescriptionStatusDropdown
                      currentStatus={selectedPrescription.status}
                      prescriptionId={selectedPrescription.id}
                      onUpdate={handleUpdatePrescriptionStatus}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{selectedPrescription.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{selectedPrescription.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{selectedPrescription.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p>{selectedPrescription.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p>{selectedPrescription.state || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p>{selectedPrescription.country || 'Pakistan'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted On</p>
                    <p>
                      {selectedPrescription.createdAt
                        ? formatDate(selectedPrescription.createdAt)
                        : 'N/A'}
                    </p>
                  </div>
                </div>

                {selectedPrescription.notes && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Notes</p>
                    <p className="whitespace-pre-line">
                      {selectedPrescription.notes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                  onClick={() =>
                    window.open(selectedPrescription.url, '_blank')
                  }
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </Modal>

        <div className="bg-white rounded-lg">
          {/* <DynamicTable
            data={prescriptions}
            columns={columns as any}
            itemsPerPage={10}
            onDelete={handleDelete}
            onEdit={handleViewPrescription}
            isLoading={isLoading}
            isRowLoading={processingId as string}
            showCheckbox={false}
            emptyMessage="No prescriptions found"
        
          /> */}
          <DynamicTable
            data={prescriptions}
            columns={columns as any}
            itemsPerPage={10}
            onDelete={handleDelete}
            onEdit={handleViewPrescription}
            isLoading={isLoading}
            isRowLoading={processingId as string}
            showCheckbox={false}
            emptyMessage="No prescriptions found"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminPrescriptionsPage;
