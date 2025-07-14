import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import CategoryForm from '@/components/admin/Category';
import Layout from '@/components/admin/layout/Layout';
import DynamicTable from '@/components/admin/Table';
import Modal from '@/components/common/Modal';
import Search from '@/components/common/Search';
import { useCategory } from '@/hooks/category.hooks';
import { Category } from '@/types/categoryTypes';
import { AddIcon } from '@/components/icons/Icons';
import ConfirmModal from '@/components/common/ConfirmModal';
import toast from 'react-hot-toast';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const Categories = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const { categories, isLoading, error, getAllCategories, removeCategory } =
    useCategory();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

 let description = "  Are you sure you want to delete category? This action cannot be undone."
  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      if (search) {
        const filtered = categories.filter((category: Category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCategories(filtered);
      } else {
        setFilteredCategories(categories);
      }
    } else {
      setFilteredCategories([]);
    }
  }, [categories, search]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedCategory(null);
  };
  const handleDelete = (product: any) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (productToDelete && productToDelete.id) {
      try {
        await removeCategory(productToDelete.id.toString());
        toast.success('Category deleted successfully');
      } catch (error) {
        console.error('Failed to delete category:', error);
      } finally {
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
  };

  const columns = [
    {
      header: 'Category',
      key: 'image',
      type: 'image',
    },
    {
      header: 'Description',
      key: 'description',
    },
  ];

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'All Pages', href: '/admin/dashboard' },
    { label: 'Category List', href: '/categories/list', active: true },
  ];

  return (
    <Layout>
      <div className="px-6 py-6 bg-gray-50 max-h-screen overflow-y-auto">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex justify-between mb-6">
          <div className='flex sm:flex-row items-center justify-between flex-col w-full'>
          <div className="flex items-center gap-4">
            <Search
              value={search}
              placeholder="Search Category"
              onChange={handleSearchChange}
              inputClassName="!rounded-lg"
              searchBtnClassName="!rounded-r-lg"
              className="my-4 !max-w-xl"
              showButton={false}
            />
          </div>
          <button
              onClick={handleOpen}
              className="flex items-center gap-2 w-48 px-4 h-10 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <AddIcon />
              Create Category
            </button>
          </div>
          <div className="flex gap-3">
     
            <Modal show={open} onClose={handleClose}>
              <CategoryForm onSuccess={handleClose} />
            </Modal>

            <ConfirmModal
              showDeleteConfirmation={showDeleteConfirmation}
              cancelDelete={cancelDelete}
              description = {description}
              confirmDelete={confirmDelete as any}
            />
            {/* Edit Modal */}
            <Modal show={editModalOpen} onClose={handleCloseEditModal}>
              <CategoryForm
                categoryToEdit={selectedCategory}
                onSuccess={handleCloseEditModal}
              />
            </Modal>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading categories: {error}
          </div>
        )}

        <div className="bg-white rounded-lg">
          {/* {isLoading ? (
            <div className="text-center py-6">Loading categories...</div>
          ) : ( */}
          <DynamicTable
            data={filteredCategories}
            columns={columns as any}
            itemsPerPage={10}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
            showCheckbox={false}
            // emptyMessage="No categories found"
          />
          {/* )} */}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
