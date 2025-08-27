import Input from '@/components/common/Input';
import React, { useState, useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import PaymentMethod from '@/components/admin/PaymentMethod';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/admin/ImageUploader';
import Layout from '@/components/admin/layout/Layout';
import Breadcrumbs from '@/components/admin/BreadCrumbs';

// Import the custom product hook
import { useCategory } from '../../hooks/category.hooks';
import { useProduct } from '@/hooks/product.hook';

// Same schema as AddProducts
const schema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters long'),
  categoryId: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  sku: z.string().optional().nullable(),
  price: z.string().min(1, 'Sale Price is required'),
  originPrice: z.string().optional().nullable(),
  description: z.string().optional(),
  status: z.enum(['pending', 'inactive', 'active']).default('pending'),
});

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

type FormValues = z.infer<typeof schema>;

function EditProduct() {
  const router = useRouter();
  const { id: productId } = router.query;
  const [productImage, setProductImage] = useState<string | null>(null);
  const {
    product,
    getProduct,
    editProduct,
    isLoading,
    error,
    clearError,
    resetProduct,
  } = useProduct();
  const categoryState = useCategory();
  const getAllCategories = categoryState.getAllCategories;
  const categories = (categoryState as any).categories || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'pending',
    },
  });

  useEffect(() => {
    getAllCategories();

    clearError();
    return () => {
      clearError();
      resetProduct();
    };
  }, []);

  // Fetch product data when productId is available
  useEffect(() => {
    if (productId) {
      getProduct(productId as string);
    }
  }, [productId]);

  // Set form values when product data is loaded
  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('categoryId', product.categoryId);
      setValue('brand', product.brand);
      setValue('sku', product.sku);
      setValue('price', product.price.toString());
      setValue(
        'originPrice',
        product.originalPrice ? product.originalPrice.toString() : null
      );
      setValue('status', product.status);
      setValue('description', product.description || '');

      if (product.image) {
        setProductImage(product.image);
      }
    }
  }, [product, setValue]);

  // Handle image update from uploader component
  const handleImageUpdate = (imageUrl: string | null) => {
    setProductImage(imageUrl);
  };

  // Breadcrumb configuration
  const BreadcrumbItems: BreadcrumbItem[] = [
    { label: 'All Pages', href: '/' },
    { label: 'Products', href: '/admin/products' },
    {
      label: 'Edit Product',
      href: `/admin/products/edit/${productId}`,
      active: true,
    },
  ];

  // Form submission handler using Redux
  const onSubmit = async (data: FormValues) => {
    if (!productId) return;

    try {
      // Clear any previous errors
      clearError();

      const { originPrice, ...rest } = data;

      // Convert string values to numbers for prices
      const productData = {
        id: productId as string,
        ...rest,
        price: parseFloat(data.price),
        ...(data.originPrice
          ? { originPrice: parseFloat(data.originPrice) }
          : { originPrice: null }),
        image: productImage,
      };

      // Call Redux action to update product
      await editProduct(productData?.id, productData);

      // Redirect on success
      router.push('/admin/products');
    } catch (err) {
      console.error('Error updating product:', err);
      // Error will be handled by the Redux store and available in the 'error' state
    }
  };

  // Show loading state while fetching product data
  if (isLoading && !product) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 mt-5 max-h-screen overflow-auto">
        <div className="my-8">
          <Breadcrumbs items={BreadcrumbItems} />
        </div>
        <h1 className="text-[28px] font-medium font-robotoSlab">
          Edit Product
        </h1>

        {/* Show error message if there is one */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-[10px] shadow-md px-6 py-4">
            <div>
              <Input
                type="text"
                label="Product Name"
                required={true}
                errors={errors}
                placeholder=""
                name="name"
                register={register('name')}
                className="!text-sm !font-robotoSlab"
              />
              <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
                Do not exceed 100 characters when entering the product name.
              </p>

              <div className="flex flex-col sm:flex-row w-full gap-4">
                {/* Category dropdown using categories from Redux */}
                <div className="flex-1">
                  <label className="block text-sm font-robotoSlab mb-1">
                    Category <span className="text-red-700">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-CloudGray rounded-[10px] outline-none"
                    {...register('categoryId')}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>

                <Input
                  type="text"
                  label="Brand"
                  required={true}
                  errors={errors}
                  placeholder=""
                  name="brand"
                  register={register('brand')}
                  className="!text-sm !font-robotoSlab flex-1"
                />
              </div>

              <div className="flex sm:flex-row flex-col gap-4 py-3">
                <Input
                  type="text"
                  label="SKU"
                  required={false}
                  errors={errors}
                  placeholder=""
                  name="sku"
                  register={register('sku')}
                  className="!text-sm !font-robotoSlab flex-1"
                />
                <Input
                  type="text"
                  label="Regular Price"
                  required={false}
                  errors={errors}
                  placeholder=""
                  name="originPrice"
                  register={register('originPrice')}
                  className="!text-sm !font-robotoSlab flex-1"
                />
              </div>

              <div className="sm:w-1/2 w-full md:pr-2 pr-0">
                <Input
                  type="text"
                  label="Sale Price"
                  required={true}
                  errors={errors}
                  placeholder=""
                  name="price"
                  register={register('price')}
                  className="!text-sm !font-robotoSlab"
                />
              </div>

              <div className="py-3">
                <p className="text-sm font-robotoSlab mb-1">
                  Description{' '}
                  <span className="text-sm font-robotoSlab text-red-700">
                    *
                  </span>
                </p>
                <textarea
                  {...register('description')}
                  placeholder=""
                  className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
                ></textarea>
                <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
                  Do not exceed 3000 characters when entering the product
                  description.
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-robotoSlab mb-1">
                  Status <span className="text-red-700">*</span>
                </label>
                <select
                  className="w-full px-3 py-2 border border-CloudGray rounded-[10px] outline-none"
                  {...register('status')}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <PaymentMethod />
              </div>
            </div>
          </div>

          <div>
            <ImageUploader
              onImageChange={handleImageUpdate}
              initialImage={productImage}
            />
          </div>

          <div className="flex gap-4 my-10">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="text-DimGray text-[17px] font-robotoSlab font-medium border border-CloudGray rounded-[10px] w-full py-1"
            >
              Cancel
            </button>
            <Button
              type="submit"
              label={isLoading ? 'Processing...' : 'Update Product'}
              disabled={isLoading}
              className="!text-white !text-[17px] !font-robotoSlab"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EditProduct;
