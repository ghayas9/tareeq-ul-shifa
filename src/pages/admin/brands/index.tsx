"use client"
import React, { useState, useEffect } from 'react';
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

interface BreadcrumbItem {
    label: string;
    href: string;
    active?: boolean;
}

const Brands = () => {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState<any>(null);

    const { brands, isLoading, error, getAllBrands, deleteBrand } = useBrand();
    const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);

    let description = "Are you sure you want to delete brand? This action cannot be undone."

    useEffect(() => {
        getAllBrands();
    }, []);

    useEffect(() => {
        if (brands && brands.length > 0) {
            if (search) {
                const filtered = brands.filter((brand: Brand) =>
                    brand.name.toLowerCase().includes(search.toLowerCase())
                );
                setFilteredBrands(filtered);
            } else {
                setFilteredBrands(brands);
            }
        } else {
            setFilteredBrands([]);
        }
    }, [brands, search]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (brand: Brand) => {
        setSelectedBrand(brand);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedBrand(null);
    };

    const handleDelete = (brand: any) => {
        setBrandToDelete(brand);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = async () => {
        if (brandToDelete && brandToDelete.id) {
            try {
                await deleteBrand(brandToDelete.id.toString());
                getAllBrands()
                toast.success('Brand deleted successfully');
            } catch (error) {
                console.error('Failed to delete brand:', error);
            } finally {
                setShowDeleteConfirmation(false);
                setBrandToDelete(null);
            }
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirmation(false);
        setBrandToDelete(null);
    };


    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    const columns = [
        {
            header: 'Brand',
            key: 'logo',
            type: 'image',
        },
        // {
        //     header: 'Name',
        //     key: 'name',
        // },
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
                <span className={`${item.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
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
            <div className="px-6 py-6 bg-gray-50 max-h-screen overflow-y-auto">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex justify-between md:flex-row flex-col  mb-6">
                    <div className="flex items-center gap-4">
                        <Search
                            value={search}
                            placeholder="Search Brand"
                            onChange={handleSearchChange}
                            inputClassName="!rounded-lg !py-2"
                            searchBtnClassName="!rounded-r-lg"
                            className="my-4 !max-w-xl"
                            showButton={false}
                        />
                    </div>

                    <button
                        onClick={handleOpen}
                        className="flex items-center w-44 gap-2 px-4 mt-3 h-10 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                    >
                        <AddIcon />
                        Create Brand
                    </button>
                </div>
                <div className="flex gap-3">
                    <Modal show={open} onClose={handleClose}>
                        <BrandForm onSuccess={handleClose} />
                    </Modal>

                    <ConfirmModal
                        showDeleteConfirmation={showDeleteConfirmation}
                        cancelDelete={cancelDelete}
                        description={description}
                        confirmDelete={confirmDelete as any}
                    />

                    <Modal show={editModalOpen} onClose={handleCloseEditModal}>
                        <BrandForm
                            brandToEdit={selectedBrand}
                            onSuccess={handleCloseEditModal}
                        />
                    </Modal>
                </div>


                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        Error loading brands: {error}
                    </div>
                )}

                <div className="bg-white rounded-lg">
                    <DynamicTable
                        data={filteredBrands}
                        columns={columns as any}
                        itemsPerPage={10}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isLoading={isLoading}
                        showCheckbox={false}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Brands;