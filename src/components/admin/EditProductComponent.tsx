import Input from '@/components/common/Input';
import React, { useState, useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PaymentMethod from '@/components/admin/PaymentMethod';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/admin/ImageUploader';
import Dropdown from '@/components/common/Dropdown';
import { useProduct } from '@/hooks/product.hook';
import { useCategory } from '@/hooks/category.hooks';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';
import PageLoader from '../common/PageLoader';
import useBrand from '@/hooks/brand.hooks';

const schema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters long'),
  categoryId: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  sku: z.string().optional().nullable(),
  price: z.string().min(1, 'Sale Price is required'),
  originalPrice: z.string().optional().nullable(),
  description: z.string().optional(),
  status: z.enum(['pending', 'inactive', 'active']).default('pending'),
  ingredients: z.string().optional(),
  uses: z.string().optional(),
  dosage: z.string().optional(),
  warnings: z.string().optional(),
  quantity: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface EditProductProps {
  product: any;
  onClose: () => void;
  onSuccess: () => void;
}

const EditProductForm: React.FC<EditProductProps> = ({
  product,
  onClose,
  onSuccess,
}) => {
  const [productImage, setProductImage] = useState<string | null>(
    product?.image || null
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    product?.categoryId || ''
  );
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');
  const { editProduct, isLoading, error, clearError } = useProduct();
  const brandState = useBrand();
  const getAllBrands = brandState.getAllBrands;
  const brands = brandState?.brands || [];

  const { categories, getAllCategories } = useCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name || '',
      categoryId: product?.categoryId || '',
      brand: product?.brandId || '',
      sku: product?.sku || '',
      price: product?.price?.toString() || '',
      originalPrice: product?.originalPrice?.toString() || null,
      description: product?.description || '',
      status: product?.status || 'pending',
      ingredients: product?.ingredients || '',
      uses: product?.uses || '',
      dosage: product?.dosage || '',
      warnings: product?.warnings || '',
      quantity: product?.quantity?.toString() || '',
    },
  });
  const handleBrandSelect = (value: string) => {
    setSelectedBrandId(value);
    setValue('brand', value);
  };

  useEffect(() => {
    setSelectedBrandId(product?.brandId);
    console.log(product.brandId, 'ppp');
  }, []);
  useEffect(() => {
    const initializeForm = async () => {
      try {
        await getAllCategories();
        await getAllBrands(); // Fetch brands

        setIsInitializing(false);
      } catch (error) {
        console.error('Error initializing form:', error);
        toast.error('Failed to load categories');
        setIsInitializing(false);
      }
    };
    initializeForm();
    return () => clearError();
  }, []);

  const categoryOptions = Array.isArray(categories)
    ? categories.map((category: any) => ({
        label: category.name,
        value: category.id,
      }))
    : [];
  const brandOptions = Array.isArray(brands)
    ? brands.map((brand: any) => ({
        label: brand.name,
        value: brand.id,
      }))
    : [];

  const handleCategorySelect = (value: string) => {
    setSelectedCategoryId(value);
    setValue('categoryId', value);
    setCategoryError(null);
  };

  const handleImageUpdate = (imageUrl: string | null) => {
    setProductImage(imageUrl);
    setImageError(null);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (!selectedCategoryId) {
        setCategoryError('Category is required');
        return;
      }

      if (!productImage) {
        setImageError('Product image is required');
        return;
      }

      clearError();
      if (!product.id) {
        toast.error('Cannot update product: Missing ID');
        return;
      }
      const { originalPrice, ...rest } = data;
      const productData = {
        ...rest,
        price: parseFloat(data.price),
        ...(data.originalPrice
          ? { originalPrice: parseFloat(data.originalPrice) }
          : { originalPrice: null }),

        quantity: data.quantity ? parseInt(data.quantity) : null,
        image: productImage,
      };
      await editProduct(product?.id, productData);
      toast.success('Product updated successfully');
      onSuccess();
    } catch (err) {
      console.log(err);
    }
  };
  if (isInitializing) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[300px]">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">
      <h1 className="text-xl font-medium font-robotoSlab mb-4">Edit Product</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-[10px] px-4 py-4">
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

            <div className="flex flex-col w-full gap-4 mt-3">
              <div className="flex-1">
                <label className="block text-sm font-robotoSlab mb-1">
                  Category <span className="text-red-700">*</span>
                </label>
                <Dropdown
                  options={categoryOptions}
                  placeholder="Select Category"
                  onSelect={handleCategorySelect}
                  className="mt-0"
                  dropdownClassName="border-CloudGray"
                  optionlabelClassName="font-robotoSlab"
                  optionClassName="text-sm font-robotoSlab"
                  selectedValue={selectedCategoryId}
                />
                <input
                  type="hidden"
                  {...register('categoryId')}
                  value={selectedCategoryId}
                />
                {(categoryError || errors.categoryId) && (
                  <p className="text-red-500 text-xs mt-1">
                    {categoryError || errors.categoryId?.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-robotoSlab mb-1">
                  Brand <span className="text-red-700">*</span>
                </label>
                <Dropdown
                  options={brandOptions}
                  placeholder="Select Brand"
                  onSelect={handleBrandSelect}
                  className="mt-0"
                  dropdownClassName="border-CloudGray"
                  optionlabelClassName="font-robotoSlab"
                  optionClassName="text-sm font-robotoSlab"
                  selectedValue={selectedBrandId}
                />
                <input
                  type="hidden"
                  {...register('brand')}
                  value={selectedBrandId}
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>
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
                name="originalPrice"
                register={register('originalPrice')}
                className="!text-sm !font-robotoSlab flex-1"
              />
            </div>

            <div className="flex sm:flex-row flex-col gap-4 py-3">
              <Input
                type="text"
                label="Sale Price"
                required={true}
                errors={errors}
                placeholder=""
                name="price"
                register={register('price')}
                className="!text-sm !font-robotoSlab flex-1"
              />
              <Input
                type="number"
                label="Quantity"
                required={false}
                errors={errors}
                placeholder="Enter product quantity"
                name="quantity"
                register={register('quantity')}
                className="!text-sm !font-robotoSlab flex-1"
              />
            </div>

            <div className="py-3">
              <p className="text-sm font-robotoSlab mb-1">
                Description{' '}
                <span className="text-sm font-robotoSlab text-red-700">*</span>
              </p>
              <textarea
                {...register('description')}
                placeholder=""
                className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
              ></textarea>
            </div>

            <div className="py-3">
              <p className="text-sm font-robotoSlab mb-1">Ingredients</p>
              <textarea
                {...register('ingredients')}
                placeholder="Enter product ingredients"
                className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
              ></textarea>
            </div>

            <div className="py-3">
              <p className="text-sm font-robotoSlab mb-1">Uses</p>
              <textarea
                {...register('uses')}
                placeholder="Enter product uses"
                className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
              ></textarea>
            </div>

            <div className="py-3">
              <p className="text-sm font-robotoSlab mb-1">Dosage</p>
              <textarea
                {...register('dosage')}
                placeholder="Enter product dosage information"
                className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
              ></textarea>
            </div>

            <div className="py-3">
              <p className="text-sm font-robotoSlab mb-1">Warnings</p>
              <textarea
                {...register('warnings')}
                placeholder="Enter product warnings"
                className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
              ></textarea>
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

            <div>
              <ImageUploader
                onImageChange={handleImageUpdate}
                initialImage={productImage}
              />
              {imageError && (
                <p className="text-red-500 text-xs mt-1">{imageError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="text-DimGray text-[17px] font-robotoSlab font-medium border border-CloudGray rounded-[10px] w-full py-1"
          >
            Cancel
          </button>
          <Button
            type="submit"
            label={isLoading ? <Spinner /> : 'Update Product'}
            disabled={isLoading}
            className="!text-white !text-[17px] !font-robotoSlab"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
