// src/pages/admin/prescriptions.tsx (Updated with Image Viewer)
import React, { useState, useEffect } from 'react';
import Layout from '@/components/admin/layout/Layout';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import DynamicTable from '@/components/admin/Table';
import ConfirmModal from '@/components/common/ConfirmModal';
// import Search from '@/components/common/Search';
import { usePrescription } from '@/hooks/prescription.hooks';
import { Prescription, PrescriptionFilterParams } from '@/types/prescription.types';
import toast from 'react-hot-toast';
import PrescriptionStatusDropdown from '@/components/PrescriptionStatusDropdown';
import PrescriptionDetailView from '@/components/PrescriptionDetailView';

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
    updatePrescription
  } = usePrescription();

  // const [search, setSearch] = useState('');
  const [currentFilters, setCurrentFilters] = useState<PrescriptionFilterParams>({
    limit: 10,
    offset: 0
  });
  
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState<Prescription | null>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

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

  // const handleSearchChange = (value: string) => {
  //   setSearch(value);
  // };

  // const handleSearch = () => {
  //   loadPrescriptions({ ...currentFilters, search, offset: 0 });
  // };

  // const handleApplyFilters = (filters: PrescriptionFilterParams) => {
  //   loadPrescriptions(filters);
  // };

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

  // const confirmDelete = async () => {
  //   if (prescriptionToDelete) {
  //     setProcessingId(prescriptionToDelete.id);
  //     try {
        
  //       loadPrescriptions(currentFilters);
  //     } catch (error) {
  //       console.error('Failed to delete prescription:', error);
  //       toast.error('Failed to delete prescription');
  //     } finally {
  //       setProcessingId(null);
  //       setShowDeleteConfirmation(false);
  //       setPrescriptionToDelete(null);
  //     }
  //   }
  // };

  // const cancelDelete = () => {
  //   setShowDeleteConfirmation(false);
  //   setPrescriptionToDelete(null);
  // };

  const handleUpdatePrescriptionStatus = async (prescriptionId: string, newStatus: string) => {
    setProcessingId(prescriptionId);
    
    try {
      await updatePrescription(prescriptionId, {
        status: newStatus as any,
        notes: `Status changed to ${newStatus}`
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
      header: 'ID',
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
          {/* <div className="flex sm:flex-row items-center justify-between flex-col w-full">
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
            </div>
          </div> */}
        </div>

        {/* Filters */}
        {/* <PrescriptionFilters 
          onApplyFilters={handleApplyFilters} 
          currentFilters={currentFilters}
          isAdmin={true}
        /> */}

        {/* <ConfirmModal
          showDeleteConfirmation={showDeleteConfirmation}
          cancelDelete={cancelDelete}
          description="Are you sure you want to delete this prescription? This action cannot be undone."
          confirmDelete={confirmDelete}
        /> */}
        {selectedPrescription && (
          <PrescriptionDetailView
            prescription={selectedPrescription}
            show={showPrescriptionModal}
            onClose={handleCloseModal}
            onUpdateStatus={handleUpdatePrescriptionStatus}
            isAdmin={true}
          />
        )}

        <div className="bg-white rounded-lg">
          <DynamicTable
            data={prescriptions}
            columns={columns as any}
            itemsPerPage={currentFilters.limit || 10}
            // onDelete={handleDelete}
            onEdit={handleViewPrescription}
            isLoading={isLoading}
            isRowLoading={processingId as string}
            showCheckbox={false}
            emptyMessage="No prescriptions found"
            totalItems={meta?.total || 0}
            totalPages={meta?.pages || 1}
            currentPage={meta?.page || 1}
            onPageChange={handlePageChange}
            onItemsPerPageChange={(limit) => {
              loadPrescriptions({ ...currentFilters, limit, offset: 0 });
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AdminPrescriptionsPage;