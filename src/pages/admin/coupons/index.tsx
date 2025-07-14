// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Breadcrumbs from '@/components/admin/BreadCrumbs';
// import ExportPdf from '@/components/admin/ExpordPdf';
// import Layout from '@/components/admin/layout/Layout';
// import Search from '@/components/common/Search';
// import { useCoupon } from '@/hooks/coupon.hooks';
// import Dropdown from '@/components/common/Dropdown';
// import DynamicTable from '@/components/admin/Table';
// import toast from 'react-hot-toast';
// import { Coupon } from '@/types/couponTypes';
// import Modal from '@/components/common/Modal';
// import ConfirmModal from '@/components/common/ConfirmModal';
// import { AddIcon } from '@/components/icons/Icons';
// import EditCoupon from '@/components/admin/EditCoupon';

// interface BreadcrumbItem {
//   label: string;
//   href: string;
//   active?: boolean;
// }

// const breadcrumbItems: BreadcrumbItem[] = [
//   { label: 'All Pages', href: '/' },
//   { label: 'Promotions', href: '/admin/promotions' },
//   { label: 'Discount List', href: '/admin/coupons', active: true },
// ];

// const columns = [
//   { key: 'code', header: 'Coupon Code' },
//   { key: 'discountValue', header: 'Discount' },
//   { key: 'startDate', header: 'Start Date' },
//   { key: 'endDate', header: 'End Date' },
//   { key: 'usageCount', header: 'Usage' },
//   { key: 'status', header: 'Status', type: 'productStatus' },
// ];

// const statusOptions = [
//   { label: 'All Status', value: '' },
//   { label: 'Active', value: 'true' },
//   { label: 'Inactive', value: 'false' },
// ];

// const sortOptions = [
//   { label: 'Newest First', value: 'createdAt:desc' },
//   { label: 'Oldest First', value: 'createdAt:asc' },
//   { label: 'Code (A-Z)', value: 'code:asc' },
//   { label: 'Code (Z-A)', value: 'code:desc' },
// ];

// const Coupons = () => {
//   const router = useRouter();
//   const [search, setSearch] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [selectedSort, setSelectedSort] = useState('createdAt:desc');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
//   const {
//     coupons,
//     totalCoupons,
//     totalPages,
//     isLoading,
//     error,
//     fetchCoupons,
//     removeCoupon,
//   } = useCoupon();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [sortBy, order] = selectedSort.split(':');
//         const params = {
//           page: currentPage,
//           limit: itemsPerPage,
//           search: search || undefined,
//           active: selectedStatus || undefined,
//           sortBy,
//           order,
//         };

//         await fetchCoupons(params as any);
//       } catch (error) {
//         console.error('Error fetching coupons:', error);
//       }
//     };

//     fetchData();
//   }, [currentPage, itemsPerPage, search, selectedStatus, selectedSort]);

//   const handleSearchChange = (value: string) => {
//     setSearch(value);
//     setCurrentPage(1);
//   };

//   const handleStatusFilter = (value: string) => {
//     setSelectedStatus(value);
//     setCurrentPage(1);
//   };

//   const handleSortChange = (value: string) => {
//     setSelectedSort(value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleItemsPerPageChange = (limit: number) => {
//     setItemsPerPage(limit);
//     setCurrentPage(1);
//   };

//   const handleAddCoupon = () => {
//     router.push('/admin/create-coupon');
//   };

//   const handleEditCoupon = (coupon: any) => {
//     setSelectedCoupon(coupon);
//     setIsEditModalOpen(true);
//   };

//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//     setSelectedCoupon(null);
//   };

//   const handleEditSuccess = async () => {
//     // Refresh the coupon list after successful edit
//     const [sortBy, order] = selectedSort.split(':');
//     await fetchCoupons({
//       page: currentPage,
//       limit: itemsPerPage,
//       search: search || undefined,
//       active: selectedStatus || undefined,
//       sortBy,
//       order,
//     } as any);
//   };

//   const handleConfirmDelete = (id: string) => {
//     setConfirmDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteCoupon = async () => {
//     if (!confirmDelete) return;

//     try {
//       await removeCoupon(confirmDelete);
//       setIsDeleteModalOpen(false);
//       setConfirmDelete(null);
//       const [sortBy, order] = selectedSort.split(':') as any;
//       await fetchCoupons({
//         page: currentPage,
//         limit: itemsPerPage,
//         search: search || undefined,
//         active: selectedStatus || undefined,
//         sortBy,
//         order,
//       });

//       toast.success('Coupon deleted successfully');
//     } catch (error) {
//       console.error('Error deleting coupon:', error);
//       toast.error('Failed to delete coupon');
//     }
//   };

//   const formatCouponData = (coupons: Coupon[]) => {
//     return coupons.map((coupon) => ({
//       ...coupon,
//       discountValue:
//         coupon.discountType === 'percentage'
//           ? `${coupon.discountValue}%`
//           : `$${coupon.discountValue}`,
//       startDate: new Date(coupon.startDate).toLocaleDateString(),
//       endDate: coupon.endDate
//         ? new Date(coupon.endDate).toLocaleDateString()
//         : 'No Expiry',
//       status: coupon.isActive ? 'Active' : 'Inactive'
//     }));
//   };

//   return (
//     <Layout>
//       <div className="px-6 py-6 bg-gray-50 max-h-screen">
//         <Breadcrumbs items={breadcrumbItems} />
//         <h1 className="text-2xl font-bold my-4">Coupons</h1>

//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-4">
//             <Search
//               value={search}
//               placeholder="Search for Coupons"
//               onChange={handleSearchChange}
//               inputClassName="!rounded-lg"
//               searchBtnClassName="!rounded-r-lg"
//               className="my-4 !max-w-xl"
//               showButton={false}
//             />

//             <Dropdown
//               options={statusOptions}
//               placeholder="Filter by Status"
//               onSelect={handleStatusFilter}
//               className="w-40"
//             />

//             <Dropdown
//               options={sortOptions}
//               placeholder="Sort By"
//               onSelect={handleSortChange}
//               className="w-48"
//               selectedValue={selectedSort}
//             />
//           </div>

//           <div className="flex gap-3">
//             <ExportPdf />
//             <button
//               onClick={handleAddCoupon}
//               className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
//             >
//               <AddIcon />
//               Add Coupon
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <DynamicTable
//             data={formatCouponData(coupons)}
//             columns={columns as any}
//             itemsPerPage={itemsPerPage}
//             onEdit={handleEditCoupon}
//             onDelete={handleConfirmDelete}
//             isLoading={isLoading}
//             showCheckbox={false}
//             emptyMessage="No Coupons found"
//             totalItems={totalCoupons}
//             totalPages={totalPages}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//             onItemsPerPageChange={handleItemsPerPageChange}
//           />
//         </div>

//         {/* Delete Confirmation Modal */}
//         <ConfirmModal
//           showDeleteConfirmation={isDeleteModalOpen}
//           cancelDelete={() => setIsDeleteModalOpen(false)}
//           confirmDelete={handleDeleteCoupon}
//           description="Are you sure you want to delete this coupon? This action cannot be undone."
//         />

//         {/* Edit Coupon Modal */}
//         <Modal show={isEditModalOpen} onClose={handleCloseEditModal}>
//           {selectedCoupon && (
//             <EditCoupon
//               coupon={selectedCoupon}
//               onClose={handleCloseEditModal}
//               onSuccess={handleEditSuccess}
//             />
//           )}
//         </Modal>
//       </div>
//     </Layout>
//   );
// };

// export default Coupons;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import ExportPdf from '@/components/admin/ExpordPdf';
import Layout from '@/components/admin/layout/Layout';
import Search from '@/components/common/Search';
import { useCoupon } from '@/hooks/coupon.hooks';
import Dropdown from '@/components/common/Dropdown';
import DynamicTable from '@/components/admin/Table';
import toast from 'react-hot-toast';
import { Coupon } from '@/types/couponTypes';
import Modal from '@/components/common/Modal';
import ConfirmModal from '@/components/common/ConfirmModal';
import { AddIcon } from '@/components/icons/Icons';
import EditCoupon from '@/components/admin/EditCoupon';
import ExportData from '@/components/admin/ExpordPdf';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'All Pages', href: '/admin/dashboard' },
  { label: 'Coupons', href: '/admin/coupons' },
  { label: 'Discount List', href: '/admin/coupons', active: true },
];

const columns = [
  { key: 'code', header: 'Coupon Code' },
  { key: 'discountValue', header: 'Discount' },
  { key: 'startDate', header: 'Start Date' },
  { key: 'endDate', header: 'End Date' },
  { key: 'usageCount', header: 'Usage' },
  { key: 'status', header: 'Status', type: 'productStatus' },
];

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'true' },
  { label: 'Inactive', value: 'false' },
];

const sortOptions = [
  { label: 'Newest First', value: 'createdAt:desc' },
  { label: 'Oldest First', value: 'createdAt:asc' },
  { label: 'Code (A-Z)', value: 'code:asc' },
  { label: 'Code (Z-A)', value: 'code:desc' },
];

const Coupons = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSort, setSelectedSort] = useState('createdAt:desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const {
    coupons,
    totalCoupons,
    totalPages,
    isLoading,
    error,
    fetchCoupons,
    removeCoupon,
  } = useCoupon();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sortBy, order] = selectedSort.split(':');
        const params = {
          page: currentPage,
          limit: itemsPerPage,
          search: search || undefined,
          active: selectedStatus || undefined,
          sortBy,
          order,
        };

        await fetchCoupons(params as any);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, search, selectedStatus, selectedSort]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleAddCoupon = () => {
    router.push('/admin/create-coupon');
  };

  const handleEditCoupon = (coupon: any) => {
    setSelectedCoupon(coupon);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleEditSuccess = async () => {
    // Refresh the coupon list after successful edit
    const [sortBy, order] = selectedSort.split(':');
    await fetchCoupons({
      page: currentPage,
      limit: itemsPerPage,
      search: search || undefined,
      active: selectedStatus || undefined,
      sortBy,
      order,
    } as any);
  };

  const handleConfirmDelete = (id: string) => {
    setConfirmDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCoupon = async () => {
    if (!confirmDelete) return;

    try {
      await removeCoupon(confirmDelete);
      setIsDeleteModalOpen(false);
      setConfirmDelete(null);
      const [sortBy, order] = selectedSort.split(':') as any;
      await fetchCoupons({
        page: currentPage,
        limit: itemsPerPage,
        search: search || undefined,
        active: selectedStatus || undefined,
        sortBy,
        order,
      });

      toast.success('Coupon deleted successfully');
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Failed to delete coupon');
    }
  };

  const formatCouponData = (coupons: Coupon[]) => {
    return coupons.map((coupon) => ({
      ...coupon,
      discountValue:
        coupon.discountType === 'percentage'
          ? `${coupon.discountValue}%`
          : `$${coupon.discountValue}`,
      startDate: new Date(coupon.startDate).toLocaleDateString(),
      endDate: coupon.endDate
        ? new Date(coupon.endDate).toLocaleDateString()
        : 'No Expiry',
      status: coupon.isActive ? 'Active' : 'Inactive',
    }));
  };

  const prepareCouponExport = () => {
    // Use the existing formatter but clean up data for export
    return formatCouponData(coupons).map((coupon) => ({
      code: coupon.code,
      discountValue: coupon.discountValue,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      usageCount: coupon.usageCount?.toString() || '0',
      status: coupon.status,
    }));
  };

  // Define column mapping for exports
  const couponColumnMapping: Record<string, string> = {
    code: 'Coupon Code',
    discountValue: 'Discount Value',
    startDate: 'Valid From',
    endDate: 'Valid Until',
    usageCount: 'Usage Count',
    status: 'Status',
  };

  return (
    <Layout>
      <div className="px-6 py-6 bg-gray-50 max-h-screen">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl font-bold my-4">Coupons</h1>

        <div className="flex justify-between flex-col mb-6">
          <div className="flex my-4 md:flex-row items-center flex-col gap-4">
            <Search
              value={search}
              placeholder="Search for Coupons"
              onChange={handleSearchChange}
              inputClassName="!rounded-lg !py-1.5"
              searchBtnClassName="!rounded-r-lg"
              className="my-4 !max-w-xl"
              showButton={false}
            />

            <div className="flex sm:flex-row flex-col gap-4">
              <Dropdown
                options={statusOptions}
                placeholder="Filter by Status"
                onSelect={handleStatusFilter}
                className="sm:min-w-40 min-w-64"
                dropdownClassName="!h-10"
                // optionlabelClassName="!sm:text-base !text-[9px]"
              />

              <Dropdown
                options={sortOptions}
                placeholder="Sort By"
                onSelect={handleSortChange}
                className="sm:min-w-48 min-w-64"
                dropdownClassName="!h-10"
                selectedValue={selectedSort}
                // optionlabelClassName="!sm:text-base !text-[9px]"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <ExportData
              data={prepareCouponExport()}
              filename="coupons-list"
              pdfTitle="Coupons Report"
              columnMapping={couponColumnMapping}
            />
            <button
              onClick={handleAddCoupon}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <AddIcon />
              Add Coupon
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <DynamicTable
            data={formatCouponData(coupons)}
            columns={columns as any}
            itemsPerPage={itemsPerPage}
            onEdit={handleEditCoupon}
            onDelete={handleConfirmDelete}
            isLoading={isLoading}
            showCheckbox={false}
            emptyMessage="No Coupons found"
            totalItems={totalCoupons}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          showDeleteConfirmation={isDeleteModalOpen}
          cancelDelete={() => setIsDeleteModalOpen(false)}
          confirmDelete={handleDeleteCoupon}
          description="Are you sure you want to delete this coupon? This action cannot be undone."
        />

        {/* Edit Coupon Modal */}
        <Modal show={isEditModalOpen} onClose={handleCloseEditModal}>
          {selectedCoupon && (
            <EditCoupon
              coupon={selectedCoupon}
              onClose={handleCloseEditModal}
              onSuccess={handleEditSuccess}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Coupons;
