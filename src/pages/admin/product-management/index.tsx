'use client';
interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import EditProductForm from '@/components/admin/EditProductComponent';
import ExportData from '@/components/admin/ExpordPdf';
import ExportPdf from '@/components/admin/ExpordPdf';
import Layout from '@/components/admin/layout/Layout';
import DynamicTable from '@/components/admin/Table';
import ConfirmModal from '@/components/common/ConfirmModal';
import Modal from '@/components/common/Modal';
import Search from '@/components/common/Search';
import { AddIcon } from '@/components/icons/Icons';
import { useCategory } from '@/hooks/category.hooks';
import { useProduct } from '@/hooks/product.hook';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import toast from 'react-hot-toast';
import { FiFilter } from 'react-icons/fi';

const ProductManagement = () => {
  const router = useRouter();
  const initialRender = useRef(true);

  // Initialize with default of 2, but will be overridden by URL if available
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { getAllCategories } = useCategory();
  const [categories, setCategories] = useState([]);

  let description =
    'Are you sure you want to delete product? This action cannot be undone.';

  const {
    getAllProducts,
    getProduct,
    products,
    removeProduct,
    isLoading,
    error,
    clearError,
    pagination, // Get pagination from redux state
  } = useProduct();

  // Calculate totalProducts and totalPages
  const totalProducts = pagination?.total || products.length;

  // Calculate totalPages directly since it's not available in the hook
  const totalPages = useMemo(() => {
    const pages =
      pagination?.totalPages || Math.ceil(totalProducts / itemsPerPage);
    console.log(
      `Calculating totalPages: ${totalProducts} / ${itemsPerPage} = ${pages}`
    );
    return pages || 1; // Ensure at least 1 page
  }, [totalProducts, itemsPerPage, pagination?.totalPages]);

  const prepareExportData = () => {
    // Format the data you want to export
    return productsWithCategories.map(product => ({
      sku: product.sku,
      name: product.name || '',
      category: product.category || 'N/A',
      price: typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price,
      status: product.status || 'Unknown'
    }));
  };

  const columnMapping: Record<string, string> = {
    sku: 'SKU',
    name: 'Product Name',
    category: 'Category',
    price: 'Price',
    status: 'Status'
  };

  const columns = [
    {
      header: 'Product',
      key: 'image',
      type: 'image',
    },
    {
      header: 'SKU',
      key: 'sku',
    },
    {
      header: 'Category',
      key: 'category',
    },
    {
      header: 'Price',
      key: 'price',
    },
    {
      header: 'Status',
      key: 'status',
      type: 'productStatus',
    },
  ];

  // This effect reads URL parameters when router is ready
  useEffect(() => {
    if (router.isReady) {
      // Get parameters from URL
      const urlPage = router.query.page
        ? parseInt(router.query.page as string, 10)
        : 1;
      const urlLimit = router.query.limit
        ? parseInt(router.query.limit as string, 10)
        : 10;
      const urlSearch = (router.query.search as string) || '';

      console.log('URL params detected - page:', urlPage, 'limit:', urlLimit);

      // Update state with URL values
      setCurrentPage(urlPage);
      setItemsPerPage(urlLimit);
      if (urlSearch !== search) setSearch(urlSearch);
    }
  }, [router.isReady, router.query]); // Include router.query to detect URL changes

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response?.data) {
          setCategories(response?.data as any);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products with pagination
  useEffect(() => {
    if (!router.isReady) return;

    console.log(
      'Fetching products with itemsPerPage:',
      itemsPerPage,
      'page:',
      currentPage
    );

    // Call getAllProducts with pagination parameters
    getAllProducts({
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
  const productsWithCategories = products.map((product: any) => {
    const category = categories.find(
      (cat: any) => cat.id === product.categoryId
    ) as any;

    return {
      ...product,
      category: category ? category.name : 'Unknown Category',
      price: product?.price,
    };
  });

  const handleEdit = async (product: any) => {
    try {
      setSelectedProduct(product);
      setEditModalOpen(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to load product details');
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditSuccess = () => {
    handleCloseEditModal();
    getAllProducts({
      page: currentPage,
      limit: itemsPerPage,
      search: search || undefined,
    });
  };

  const handleDelete = (product: any) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  // Add pagination handlers
  const handlePageChange = (page: number) => {
    console.log('Changing page to:', page);
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (limit: number) => {
    console.log('Changing items per page to:', limit);
    setItemsPerPage(limit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  const confirmDelete = async () => {
    if (productToDelete && productToDelete.id) {
      try {
        setDeletingProductId(productToDelete.id);
        await removeProduct(productToDelete.id.toString());
        getAllProducts({
          page: currentPage,
          limit: itemsPerPage,
          search: search || undefined,
        });
      } catch (error) {
        console.error('Failed to delete product:', error);
        toast.error('Failed to delete product');
      } finally {
        setDeletingProductId(null);
        setShowDeleteConfirmation(false);
        setProductToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleAddProduct = () => {
    router.push('/admin/add-products');
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'All Pages', href: '/admin/dashboard' },
    { label: 'Product List', href: '/products/list', active: true },
  ];

 

  return (
    <Layout>
      <div className="px-6 py-6 bg-gray-50">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl font-bold my-4">Product Management</h1>

        <div className="flex justify-between md:flex-row gap-3 flex-col mb-6">
          <div className="flex items-center gap-4">
            <Search
              value={search}
              placeholder="Search Products"
              onChange={handleSearchChange}
              inputClassName="!rounded-lg !py-2"
              searchBtnClassName="!rounded-r-lg"
              className="my-4 !max-w-xl"
              showButton={false}
            />
          </div>
          <div className="flex gap-3 items-center">
          <ExportData 
              data={prepareExportData()}
              filename="products-inventory"
              pdfTitle="Product Inventory"
              pdfSubtitle={`Generated on ${new Date().toLocaleDateString()}`}
              columnMapping={columnMapping}
            />
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-4 h-10 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <AddIcon />
              Add Product
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading products: {error}
          </div>
        )}

        <div className="bg-white rounded-lg">
          <DynamicTable
            data={productsWithCategories}
            columns={columns as any}
            itemsPerPage={itemsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            isRowLoading={deletingProductId as any}
            showCheckbox={false}
            emptyMessage="No products found"
            totalItems={totalProducts}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>

      <ConfirmModal
        showDeleteConfirmation={showDeleteConfirmation}
        cancelDelete={cancelDelete}
        confirmDelete={confirmDelete}
        description={description}
      />
      {/* Edit Product Modal */}
      <Modal show={editModalOpen} onClose={handleCloseEditModal}>
        {selectedProduct && (
          <EditProductForm
            product={selectedProduct}
            onClose={handleCloseEditModal}
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default ProductManagement;
