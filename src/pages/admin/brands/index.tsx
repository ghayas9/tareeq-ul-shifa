'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import Layout from '@/components/admin/layout/Layout';
import DynamicTable from '@/components/admin/Table';
import Modal from '@/components/common/Modal';
import Search from '@/components/common/Search';
import { useBrand } from '@/hooks/brand.hooks';
import { Brand } from '@/types/brandTypes';
import { AddIcon } from '@/components/icons/Icons';
import ConfirmModal from '@/components/common/ConfirmModal';
import toast from 'react-hot-toast';
import BrandForm from '@/components/admin/BrandForm';
import { useRouter } from 'next/router';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const Brands = () => {
  const router = useRouter();
  const initialRender = useRef(true);

  // meta states - Initialize with default values
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  // Modal and form states
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<any>(null);
  const [deletingBrandId, setDeletingBrandId] = useState<string | null>(null);

  const { brands, isLoading, error, getAllBrands, deleteBrand, meta } =
    useBrand();

  let description =
    'Are you sure you want to delete brand? This action cannot be undone.';

  // Calculate total items and pages
  const totalBrands = meta?.total || 0;

  const totalPages = useMemo(() => {
    const pages = meta?.totalPages || Math.ceil(totalBrands / itemsPerPage);
    console.log(
      `Calculating totalPages: ${totalBrands} / ${itemsPerPage} = ${pages}`
    );
    return pages || 1;
  }, [totalBrands, itemsPerPage, meta?.totalPages]);

  // Read URL parameters when router is ready
  useEffect(() => {
    if (router.isReady) {
      const urlPage = router.query.page
        ? parseInt(router.query.page as string, 10)
        : 1;
      const urlLimit = router.query.limit
        ? parseInt(router.query.limit as string, 10)
        : 10;
      const urlSearch = (router.query.search as string) || '';

      console.log('URL params detected - page:', urlPage, 'limit:', urlLimit);

      setCurrentPage(urlPage);
      setItemsPerPage(urlLimit);
      if (urlSearch !== search) setSearch(urlSearch);
    }
  }, [router.isReady, router.query]);

  // Fetch brands with meta
  useEffect(() => {
    if (!router.isReady) return;

    console.log(
      'Fetching brands with itemsPerPage:',
      itemsPerPage,
      'page:',
      currentPage
    );

    // Call getAllBrands with meta parameters
    getAllBrands({
      page: currentPage,
      limit: itemsPerPage,
      search: search || undefined,
    });

    // Only update URL after initial render
    if (!initialRender.current) {
      updateUrl();
    } else {
      initialRender.current = false;
    }
  }, [currentPage, itemsPerPage, search, router.isReady]);

  // Update URL with current meta state
  const updateUrl = () => {
    const query: Record<string, string> = {
      ...(router.query as Record<string, string>),
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    };

    if (search) {
      query.search = search;
    } else {
      delete query.search;
    }

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  // meta handlers
  const handlePageChange = (page: number) => {
    console.log('Changing page to:', page);
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (limit: number) => {
    console.log('Changing items per page to:', limit);
    setItemsPerPage(limit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Modal handlers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    handleClose();
    // Refresh brands list after successful creation
    getAllBrands({
      page: currentPage,
      limit: itemsPerPage,
      search: search || undefined,
    });
  };

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedBrand(null);
  };

  const handleEditSuccess = () => {
    handleCloseEditModal();
    // Refresh brands list after successful edit
    getAllBrands({
      page: currentPage,
      limit: itemsPerPage,
      search: search || undefined,
    });
  };

  // Delete handlers
  const handleDelete = (brand: any) => {
    setBrandToDelete(brand);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (brandToDelete && brandToDelete.id) {
      try {
        setDeletingBrandId(brandToDelete.id);
        await deleteBrand(brandToDelete.id.toString());
        toast.success('Brand deleted successfully');

        // Refresh brands list after successful deletion
        getAllBrands({
          page: currentPage,
          limit: itemsPerPage,
          search: search || undefined,
        });
      } catch (error) {
        console.error('Failed to delete brand:', error);
        toast.error('Failed to delete brand');
      } finally {
        setDeletingBrandId(null);
        setShowDeleteConfirmation(false);
        setBrandToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setBrandToDelete(null);
  };

  const columns = [
    {
      header: 'Brand',
      key: 'logo',
      type: 'image',
    },
    {
      header: 'Description',
      key: 'description',
    },
    {
      header: 'Website',
      key: 'website',
    },
    {
      header: 'Discount',
      key: 'discount',
      render: (item: Brand) => (
        <span>{item.discount ? `${item.discount}%` : '-'}</span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (item: Brand) => (
        <span
          className={`${item.status === 'active' ? 'text-green-500' : 'text-red-500'}`}
        >
          {item.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'All Pages', href: '/admin/dashboard' },
    { label: 'Brand List', href: '/admin/brands', active: true },
  ];

  return (
    <Layout>
      <div className="px-6 py-6 bg-gray-50">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl font-bold my-4">Brand Management</h1>

        <div className="flex justify-between md:flex-row gap-3 flex-col mb-6">
          <div className="flex items-center gap-4">
            <Search
              value={search}
              placeholder="Search Brands"
              onChange={handleSearchChange}
              inputClassName="!rounded-lg !py-2"
              searchBtnClassName="!rounded-r-lg"
              className="my-4 !max-w-xl"
              showButton={false}
            />
          </div>

          <button
            onClick={handleOpen}
            className="flex items-center gap-2 px-4 h-10 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <AddIcon />
            Create Brand
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading brands: {error}
          </div>
        )}

        <div className="bg-white rounded-lg">
          <DynamicTable
            data={brands || []}
            columns={columns as any}
            itemsPerPage={itemsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            isRowLoading={deletingBrandId as any}
            showCheckbox={false}
            emptyMessage="No brands found"
            totalItems={totalBrands}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal show={open} onClose={handleClose}>
        <BrandForm onSuccess={handleSuccess} />
      </Modal>

      <Modal show={editModalOpen} onClose={handleCloseEditModal}>
        {selectedBrand && (
          <BrandForm
            brandToEdit={selectedBrand}
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>

      <ConfirmModal
        showDeleteConfirmation={showDeleteConfirmation}
        cancelDelete={cancelDelete}
        description={description}
        confirmDelete={confirmDelete}
      />
    </Layout>
  );
};

export default Brands;
