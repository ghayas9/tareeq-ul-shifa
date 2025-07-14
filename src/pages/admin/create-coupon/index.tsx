import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import Input from '@/components/common/Input';
import StatusToggle from '@/components/admin/StatusToggle';
import Button from '@/components/common/Button';
import Layout from '@/components/admin/layout/Layout';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import Dropdown from '@/components/common/Dropdown';
import { useCoupon } from '@/hooks/coupon.hooks';
import Spinner from '@/components/Spinner';

const schema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters'),
  description: z.string().optional(),
  discountType: z.enum(['percentage', 'fixed']).default('percentage'),
  discountValue: z
    .string()
    .min(1, 'Discount Value is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: 'Discount value must be a positive number',
    }),
  minimumPurchase: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0),
      {
        message: 'Minimum purchase must be a non-negative number',
      }
    ),
  startDate: z.string().min(1, 'Start Date is required'),
  endDate: z.string().optional(),
  usageLimit: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) > 0), {
      message: 'Usage limit must be a positive number',
    }),
});

type FormValues = z.infer<typeof schema>;

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const BreadcrumbItems: BreadcrumbItem[] = [
  { label: 'All Pages', href: '/admin/dashboard' },
  { label: 'Coupons', href: '/admin/coupons' },
  { label: 'Create Coupon', href: '/admin/create-coupon', active: true },
];

function CreateCoupon() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(true);
  const [selectedDiscountType, setSelectedDiscountType] =
    useState<string>('percentage');

  const { addCoupon, isLoading, error, clearError } = useCoupon();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      discountType: 'percentage',
      startDate: new Date().toISOString().split('T')[0],
    },
  });

  const discountTypeOptions = [
    { label: 'Percentage (%)', value: 'percentage' },
    { label: 'Fixed Amount', value: 'fixed' },
  ];

  const handleDiscountTypeSelect = (value: string) => {
    setSelectedDiscountType(value);
    setValue('discountType', value as 'percentage' | 'fixed');
  };

  const handleToggleChange = (value: boolean) => {
    setIsActive(value);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      clearError();
      const couponData = {
        code: data.code,
        description: data.description || null,
        discountType: data.discountType,
        discountValue: parseFloat(data.discountValue),
        minimumPurchase: data.minimumPurchase
          ? parseFloat(data.minimumPurchase)
          : null,
        startDate: data.startDate,
        endDate: data.endDate || null,
        isActive: isActive,
        usageLimit: data.usageLimit ? parseInt(data.usageLimit) : null,
      };
      await addCoupon(couponData);
      router.push('/admin/coupons');
    } catch (err) {
      console.error('Error adding coupon:', err);
      toast.error('Failed to create coupon');
    }
  };

  return (
    <Layout>
      <div className="px-6 mt-5">
        <div>
          <Breadcrumbs items={BreadcrumbItems} />
        </div>
        <div>
          <h2 className="text-[28px] font-medium font-robotoSlab mt-7">
            Create Coupon
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-[10px] shadow-md border px-4 mt-3">
              <div className="mt-4">
                <Input
                  type="text"
                  label="Code"
                  required={true}
                  errors={errors}
                  placeholder="Enter coupon code"
                  name="code"
                  errorClass="!-bottom-8"
                  register={register('code')}
                  className="!text-sm !font-robotoSlab !py-3"
                />
                <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
                  Customers will use this code at checkout
                </p>
              </div>

              <div className="mt-4">
                <Input
                  type="text"
                  label="Description"
                  required={false}
                  errors={errors}
                  placeholder="Optional description"
                  name="description"
                  register={register('description')}
                  className="!text-sm !font-robotoSlab !py-3"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-robotoSlab mb-1">
                  Discount Type <span className="text-red-700">*</span>
                </label>
                <Dropdown
                  options={discountTypeOptions}
                  placeholder="Select Discount Type"
                  onSelect={handleDiscountTypeSelect}
                  className="mt-0"
                  dropdownClassName="border-CloudGray"
                  // value={selectedDiscountType}
                />
                {/* Hidden input to store value for form validation */}
                <input
                  type="hidden"
                  {...register('discountType')}
                  value={selectedDiscountType}
                />
              </div>

              <div className="mt-4">
                <Input
                  type="text"
                  label="Discount Value"
                  required={true}
                  errors={errors}
                  placeholder={
                    selectedDiscountType === 'percentage'
                      ? 'Enter percentage'
                      : 'Enter amount'
                  }
                  name="discountValue"
                  errorClass="!-bottom-8"
                  register={register('discountValue')}
                  className="!text-sm !font-robotoSlab !py-3"
                />
                <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
                  {selectedDiscountType === 'percentage'
                    ? 'Enter percentage discount (e.g. 10 for 10%)'
                    : 'Enter fixed amount discount (e.g. 5.99)'}
                </p>
              </div>

              <div className="mt-4">
                <Input
                  type="text"
                  label="Minimum Purchase"
                  required={false}
                  errors={errors}
                  placeholder="Enter minimum purchase amount"
                  name="minimumPurchase"
                  register={register('minimumPurchase')}
                  className="!text-sm !font-robotoSlab !py-3"
                />
                <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
                  Minimum order value required to use this coupon
                </p>
              </div>

              <div className="mt-4">
                <h5 className="text-sm font-robotoSlab">
                  Status <span className="text-FieryRed">*</span>
                </h5>
                <StatusToggle
                  onChange={handleToggleChange}
                  initialState={isActive}
                />
              </div>

              <div className="flex sm:flex-row flex-col gap-4 mt-4">
                <div className="flex-1">
                  <Input
                    type="date"
                    label="Start Date"
                    required={true}
                    errors={errors}
                    placeholder=""
                    name="startDate"
                    register={register('startDate')}
                    className="!text-sm !font-robotoSlab !py-3"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="date"
                    label="End Date"
                    required={false}
                    errors={errors}
                    placeholder=""
                    name="endDate"
                    register={register('endDate')}
                    className="!text-sm !font-robotoSlab !py-3"
                  />
                </div>
              </div>

              <div className="mt-4 mb-6">
                <Input
                  type="text"
                  label="Usage Limit"
                  required={false}
                  errors={errors}
                  placeholder="Enter usage limit"
                  name="usageLimit"
                  register={register('usageLimit')}
                  className="!text-sm !font-robotoSlab !py-3"
                />
                <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
                  Maximum number of times this coupon can be used. Leave empty
                  for unlimited.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4 my-8 mb-36">
              <button
                type="button"
                onClick={() => router.push('/admin/coupons')}
                className="text-DimGray text-[17px] font-robotoSlab font-medium border border-CloudGray rounded-[10px] w-32 py-1.5"
              >
                Cancel
              </button>
              <Button
                type="submit"
                label={isLoading ? <Spinner/> : 'Create Coupon'}
                disabled={isLoading}
                className="!text-white !text-[17px] !w-40 !font-robotoSlab !py-1.5"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCoupon;
