// import Input from '@/components/common/Input';
// import React, { useState, useEffect } from 'react';
// import * as z from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/router';

// import PaymentMethod from '@/components/admin/PaymentMethod';
// import Button from '@/components/common/Button';
// import ImageUploader from '@/components/admin/ImageUploader';
// import Layout from '@/components/admin/layout/Layout';
// import Breadcrumbs from '@/components/admin/BreadCrumbs';
// import Dropdown from '@/components/common/Dropdown';
// import { useProduct } from '@/hooks/product.hook';
// import { useCategory } from '@/hooks/category.hooks';
// import Spinner from '@/components/Spinner';
// import toast from 'react-hot-toast';

// const schema = z.object({
//   name: z.string().min(3, 'Product name must be at least 3 characters long'),
//   categoryId: z.string().min(1, 'Category is required'),
//   brand: z.string().min(1, 'Brand is required'),
//   sku: z.string().min(1, 'SKU is required'),
//   price: z.string().min(1, 'Sale Price is required'),
//   originalPrice: z.string().min(1, 'Regular Price is required'),
//   description: z.string().optional(),
//   status: z.enum(['pending', 'inactive', 'active']).default('pending'),
//   ingredients: z.string().optional(),
//   uses: z.string().optional(),
//   dosage: z.string().optional(),
//   warnings: z.string().optional(),
//   quantity: z.string().optional(),
// });

// interface BreadcrumbItem {
//   label: string;
//   href: string;
//   active?: boolean;
// }

// type FormValues = z.infer<typeof schema>;

// const BreadcrumbItems: BreadcrumbItem[] = [
//   { label: 'All Pages', href: '/' },
//   { label: 'Products', href: '/admin/products', active: true },
//   { label: 'Add Product', href: '/admin/add-products', active: true },
// ];

// function AddProducts() {
//   const router = useRouter();
//   const [productImage, setProductImage] = useState<string | null>(null);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
//   const [categoryError, setCategoryError] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   // Use the updated hook with both sets of function names available
//   const {
//     addProduct,
//     createNewProduct, // In case the hook exposes this function name instead
//     isLoading,
//     error,
//     clearError,
//   } = useProduct();

//   // Use either addProduct or createNewProduct depending on which one is defined
//   const createProduct = addProduct || createNewProduct;

//   const categoryState = useCategory();
//   const getAllCategories = categoryState.getAllCategories;
//   const categories = categoryState?.categories || [];

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       status: 'pending',
//     },
//   });

//   useEffect(() => {
//     getAllCategories();
//     clearError();
//     return () => clearError();
//   }, []);

//   const categoryOptions = Array.isArray(categories)
//     ? categories.map((category: any) => ({
//         label: category.name,
//         value: category.id,
//       }))
//     : [];

//   const handleCategorySelect = (value: string) => {
//     setSelectedCategoryId(value);
//     setValue('categoryId', value);
//     setCategoryError(null);
//   };

//   const handleImageUpdate = (imageUrl: string | null) => {
//     setProductImage(imageUrl);
//   };

//   const onSubmit = async (data: FormValues) => {
//     try {
//       setIsSubmitting(true);

//       // Validate required fields
//       if (!selectedCategoryId) {
//         setCategoryError('Category is required');
//         setIsSubmitting(false);
//         return;
//       }

//       if (!productImage) {
//         toast.error('Product image is required');
//         setIsSubmitting(false);
//         return;
//       }

//       clearError();
//       console.log('Form data before submission:', data);

//       // Format the data for API submission
//       const productData = {
//         ...data,
//         categoryId: selectedCategoryId,
//         price: parseFloat(data.price),
//         originalPrice: parseFloat(data.originalPrice),
//         image: productImage,
//         quantity: data.quantity ? parseInt(data.quantity) : null,
//       };

//       console.log('Submitting product data:', productData);
//       const response = await createProduct(productData);
//       console.log('Product creation response:', response);
//       router.push('/admin/product-management');
//     } catch (err: any) {
//       console.error('Error adding product:', err);
//       toast.error(err?.message || 'Failed to create product');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="px-6 mt-5">
//         <div className="my-8">
//           <Breadcrumbs items={BreadcrumbItems} />
//         </div>
//         <h1 className="text-[28px] font-medium font-robotoSlab">Add Product</h1>

//         {/* Show error message if there is one */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="bg-white rounded-[10px] shadow-md px-6 py-4">
//             <div>
//               <Input
//                 type="text"
//                 label="Product Name"
//                 required={true}
//                 errors={errors}
//                 placeholder=""
//                 name="name"
//                 register={register('name')}
//                 className="!text-sm !font-robotoSlab"
//               />
//               <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
//                 Do not exceed 100 characters when entering the product name.
//               </p>

//               <div className="flex flex-col w-full gap-4">
//                 {/* Category dropdown using custom Dropdown component */}
//                 <div className="flex-1">
//                   <label className="block text-sm font-robotoSlab mb-1">
//                     Category <span className="text-red-700">*</span>
//                   </label>
//                   <Dropdown
//                     options={categoryOptions}
//                     placeholder="Select Category"
//                     onSelect={handleCategorySelect}
//                     className="mt-0"
//                     dropdownClassName="border-CloudGray"
//                     optionlabelClassName="font-robotoSlab"
//                     optionClassName="text-sm font-robotoSlab"
//                   />
//                   <input
//                     type="hidden"
//                     {...register('categoryId')}
//                     value={selectedCategoryId}
//                   />
//                   {(categoryError || errors.categoryId) && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {categoryError || errors.categoryId?.message}
//                     </p>
//                   )}
//                 </div>

//                 <Input
//                   type="text"
//                   label="Brand"
//                   required={true}
//                   errors={errors}
//                   placeholder=""
//                   name="brand"
//                   register={register('brand')}
//                   className="!text-sm !font-robotoSlab flex-1"
//                 />
//               </div>

//               <div className="flex sm:flex-row flex-col gap-4 py-3">
//                 <Input
//                   type="text"
//                   label="SKU"
//                   required={true}
//                   errors={errors}
//                   placeholder=""
//                   name="sku"
//                   register={register('sku')}
//                   className="!text-sm !font-robotoSlab flex-1"
//                 />
//                 <Input
//                   type="text"
//                   label="Regular Price"
//                   required={true}
//                   errors={errors}
//                   placeholder=""
//                   name="originalPrice"
//                   register={register('originalPrice')}
//                   className="!text-sm !font-robotoSlab flex-1"
//                 />
//               </div>

//               <div className=" flex gap-4 flex-col lg:flex-row w-full md:pr-2 pr-0">
//                 <Input
//                   type="text"
//                   label="Sale Price"
//                   required={true}
//                   errors={errors}
//                   placeholder=""
//                   name="price"
//                   register={register('price')}
//                   className="!text-sm !font-robotoSlab"
//                 />
//                 <Input
//                   type="number"
//                   label="Quantity"
//                   required={false}
//                   errors={errors}
//                   placeholder="Enter product quantity"
//                   name="quantity"
//                   register={register('quantity')}
//                   className="!text-sm !font-robotoSlab flex-1"
//                 />
//               </div>

// <div className="py-3">
//   <p className="text-sm font-robotoSlab mb-1">
//     Description{' '}
//     <span className="text-sm font-robotoSlab text-red-700">
//       *
//     </span>
//   </p>
//   <textarea
//     {...register('description')}
//     placeholder=""
//     className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
//   ></textarea>
//   <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
//     Do not exceed 3000 characters when entering the product
//     description.
//   </p>
// </div>
// <div className="py-3">
//   <p className="text-sm font-robotoSlab mb-1">Ingredients</p>
//   <textarea
//     {...register('ingredients')}
//     placeholder="Enter product ingredients"
//     className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
//   ></textarea>
// </div>
// <div className="py-3">
//   <p className="text-sm font-robotoSlab mb-1">Uses</p>
//   <textarea
//     {...register('uses')}
//     placeholder="Enter product uses"
//     className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
//   ></textarea>
// </div>

// <div className="py-3">
//   <p className="text-sm font-robotoSlab mb-1">Dosage</p>
//   <textarea
//     {...register('dosage')}
//     placeholder="Enter product dosage information"
//     className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
//   ></textarea>
// </div>

// <div className="py-3">
//   <p className="d-sm font-robotoSlab mb-1">Warnings</p>
//   <textarea
//     {...register('warnings')}
//     placeholder="Enter product warnings"
//     className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] h-32"
//   ></textarea>
// </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-robotoSlab mb-1">
//                   Status <span className="text-red-700">*</span>
//                 </label>
//                 <select
//                   className="w-full px-3 py-2 border border-CloudGray rounded-[10px] outline-none"
//                   {...register('status')}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//                 {errors.status && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.status.message}
//                   </p>
//                 )}
//               </div>

//               {/* <div className="mb-2">
//                 <PaymentMethod />
//               </div> */}
//             </div>
//           </div>

//           <div>
//             <ImageUploader onImageChange={handleImageUpdate} />
//             {!productImage && (
//               <p className="text-red-500 text-xs mt-1">
//                 Product image is required
//               </p>
//             )}
//           </div>

//           <div className="flex gap-4 my-10">
//             <button
//               type="button"
//               onClick={() => router.push('/admin/products')}
//               className="text-DimGray text-[17px] font-robotoSlab font-medium border border-CloudGray rounded-[10px] w-full py-1"
//             >
//               Cancel
//             </button>
//             <Button
//               type="submit"
//               label={isSubmitting || isLoading ? <Spinner /> : 'Create Product'}
//               disabled={isSubmitting || isLoading}
//               className="!text-white !text-[17px] !font-robotoSlab"
//             />
//           </div>
//         </form>
//       </div>
//     </Layout>
//   );
// }

// export default AddProducts;

import React, { useState, useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import Layout from '@/components/admin/layout/Layout';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import Input from '@/components/common/Input';
import Dropdown from '@/components/common/Dropdown';
import { useProduct } from '@/hooks/product.hook';
import { useCategory } from '@/hooks/category.hooks';
import { useBrand } from '@/hooks/brand.hooks';
import Button from '@/components/common/Button';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';

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

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

type FormValues = z.infer<typeof schema>;

const BreadcrumbItems: BreadcrumbItem[] = [
  { label: 'All Pages', href: '/admin/dashboard' },
  { label: 'Products', href: '/admin/product-management', active: true },
  { label: 'Add Product', href: '/admin/add-products', active: true },
];

function AddProducts() {
  const router = useRouter();
  const [productImage, setProductImage] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedBrandId, setSelectedBrandId] = useState<string>(''); // Add state for brand
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch data from hooks
  const { addProduct, isLoading, error, clearError } = useProduct();
  const categoryState = useCategory();
  const brandState = useBrand();
  const getAllCategories = categoryState.getAllCategories;
  const getAllBrands = brandState.getAllBrands;

  const categories = categoryState?.categories || [];
  const brands = brandState?.brands || [];

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
    getAllBrands(); // Fetch brands
    clearError();
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

  const handleBrandSelect = (value: string) => {
    setSelectedBrandId(value);
    setValue('brand', value);
  };

  const handleImageUpdate = (imageUrl: string | null) => {
    setProductImage(imageUrl);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      if (!selectedCategoryId) {
        setCategoryError('Category is required');
        setIsSubmitting(false);
        return;
      }

      if (!selectedBrandId) {
        toast.error('Brand is required');
        setIsSubmitting(false);
        return;
      }

      if (!productImage) {
        toast.error('Product image is required');
        setIsSubmitting(false);
        return;
      }

      clearError();
      const productData = {
        ...data,
        categoryId: selectedCategoryId,
        brand: selectedBrandId,
        price: parseFloat(data.price),
        ...(data.originalPrice
          ? { originalPrice: parseFloat(data.originalPrice) }
          : {}),

        image: productImage,
        quantity: data.quantity ? parseInt(data.quantity) : null,
      };

      const response = await addProduct(productData as any);
      console.log('Product creation response:', response);
      router.push('/admin/product-management');
    } catch (err: any) {
      console.error('Error adding product:', err);
      toast.error(err?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="px-6 mt-5">
        <div className="my-8">
          <Breadcrumbs items={BreadcrumbItems} />
        </div>
        <h1 className="text-[28px] font-medium font-robotoSlab">Add Product</h1>
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

              <div className="flex flex-col w-full gap-4">
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
                  required={true}
                  errors={errors}
                  placeholder=""
                  name="sku"
                  register={register('sku')}
                  className="!text-sm !font-robotoSlab flex-1"
                />
                <Input
                  type="text"
                  label="Regular Price"
                  required={true}
                  errors={errors}
                  placeholder=""
                  name="originalPrice"
                  register={register('originalPrice')}
                  className="!text-sm !font-robotoSlab flex-1"
                />
              </div>

              <div className=" flex gap-4 flex-col lg:flex-row w-full md:pr-2 pr-0">
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

              {/* Description & other fields... */}
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
                <p className="d-sm font-robotoSlab mb-1">Warnings</p>
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
            </div>
          </div>

          <div>
            <ImageUploader onImageChange={handleImageUpdate} />
            {!productImage && (
              <p className="text-red-500 text-xs mt-1">
                Product image is required
              </p>
            )}
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
              label={isSubmitting || isLoading ? <Spinner /> : 'Create Product'}
              disabled={isSubmitting || isLoading}
              className="!text-white !text-[17px] !font-robotoSlab"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddProducts;
