import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '@/components/common/Input';
import StatusToggle from '@/components/admin/StatusToggle';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import { useCoupon } from '@/hooks/coupon.hooks';
import Spinner from '../Spinner';

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
  usageCount: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) >= 0), {
      message: 'Usage count must be a non-negative number',
    }),
});

type FormValues = z.infer<typeof schema>;

interface EditCouponProps {
  coupon: any;
  onClose: () => void;
  onSuccess: () => void;
}

const EditCoupon: React.FC<EditCouponProps> = ({
  coupon,
  onClose,
  onSuccess,
}) => {
  const [isActive, setIsActive] = useState(coupon?.isActive);
  const [selectedDiscountType, setSelectedDiscountType] = useState<string>(
    coupon?.discountType || 'percentage'
  );
  console.log(coupon, 'couuuuuu');

  const { editCoupon, isLoading, error, clearError } = useCoupon();
  const startDate = coupon?.startDate
    ? new Date(coupon.startDate).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];
  const endDate = coupon?.endDate
    ? new Date(coupon.endDate).toISOString().split('T')[0]
    : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: coupon?.code || '',
      description: coupon?.description || '',
      discountType: coupon?.discountType || 'percentage',
      discountValue: coupon?.discountValue?.toString() || '',
      minimumPurchase: coupon?.minimumPurchase
        ? coupon.minimumPurchase.toString()
        : '',
      startDate: startDate,
      endDate: endDate,
      usageLimit: coupon?.usageLimit ? coupon.usageLimit.toString() : '',
      usageCount: coupon?.usageCount ? coupon.usageCount.toString() : '0',
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
    if (!coupon) return;
    console.log(coupon, 'coppp');
    try {
      clearError();
      const couponData = {
        id: coupon.id,
        code: data.code,
        description: data.description || null,
        discountType: data.discountType,
        discountValue: parseFloat(data.discountValue),
        minimumPurchase: data.minimumPurchase
          ? parseFloat(data.minimumPurchase)
          : null,
        startDate: data.startDate,
        endDate: data.endDate || null,
        isActive,
        usageLimit: data.usageLimit ? parseInt(data.usageLimit) : null,
        usageCount: data.usageCount
          ? parseInt(data.usageCount)
          : coupon?.usageCount,
      };
      console.log(couponData, 'cpo');
      await editCoupon(couponData);
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error updating coupon:', err);
      toast.error('Failed to update coupon');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-4">Edit Coupon</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              label="Code"
              required={true}
              errors={errors}
              placeholder="Enter coupon code"
              name="code"
              register={register('code')}
              className="!text-sm !font-robotoSlab !py-3"
            />
            <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
              Customers will use this code at checkout
            </p>
          </div>

          <div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-robotoSlab mb-1">
              Discount Type <span className="text-red-700">*</span>
            </label>
            <Dropdown
              options={discountTypeOptions}
              placeholder="Select Discount Type"
              onSelect={handleDiscountTypeSelect}
              className="mt-0"
              dropdownClassName="border-CloudGray"
              selectedValue={selectedDiscountType}
            />
            {/* Hidden input to store value for form validation */}
            <input
              type="hidden"
              {...register('discountType')}
              value={selectedDiscountType}
            />
          </div>

          <div>
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
              register={register('discountValue')}
              className="!text-sm !font-robotoSlab !py-3"
            />
            <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
              {selectedDiscountType === 'percentage'
                ? 'Enter percentage discount (e.g. 10 for 10%)'
                : 'Enter fixed amount discount (e.g. 5.99)'}
            </p>
          </div>
        </div>

        {/* Rest of the form... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
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

          <div>
            <h5 className="text-sm font-robotoSlab">
              Status <span className="text-red-500">*</span>
            </h5>
            <StatusToggle
              onChange={handleToggleChange}
              initialState={isActive}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
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
          <div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
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
              Maximum number of times this coupon can be used. Leave empty for
              unlimited.
            </p>
          </div>

          <div>
            <Input
              type="text"
              label="Current Usage Count"
              required={false}
              errors={errors}
              placeholder="Usage count"
              name="usageCount"
              register={register('usageCount')}
              className="!text-sm !font-robotoSlab !py-3"
              disabled={true}
            />
            <p className="text-[10px] font-robotoSlab font-medium text-CoolGray">
              Number of times this coupon has been used.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <Button
            type="submit"
            label={isLoading ? <Spinner /> : 'Update Coupon'}
            disabled={isLoading}
            className="!text-white !text-[17px] !font-robotoSlab !py-2"
          />
        </div>
      </form>
    </div>
  );
};

export default EditCoupon;
