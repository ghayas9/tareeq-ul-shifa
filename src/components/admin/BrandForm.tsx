'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import ImageUploader from './ImageUploader';
import Spinner from '../Spinner';
import { Brand } from '@/types/brandTypes';
import useBrand from '@/hooks/brand.hooks';

// Form validation schema
const schema = z.object({
    name: z.string().min(2, 'Brand name must be at least 2 characters long.'),
    description: z.string().optional().nullable(),
    website: z
        .string()
        .url('Website must be a valid URL')
        .optional()
        .nullable(),
    discount: z
        .number()
        .min(0, 'Discount cannot be negative')
        .max(100, 'Discount cannot exceed 100%')
        .optional()
        .nullable(),
    // .or(z.string().transform(val => val === '' ? null : Number(val)))
    // .refine(val => val === null || !isNaN(val), {
    //   message: 'Discount must be a valid number',
    // }),
    status: z.enum(['active', 'inactive']).default('active'),
});

type BrandFormData = z.infer<typeof schema>;

interface BrandFormProps {
    brandToEdit?: Brand | null;
    onSuccess?: () => void;
}

const BrandForm: React.FC<BrandFormProps> = ({
    brandToEdit,
    onSuccess,
}) => {
    const { addBrand, editBrand, getAllBrands, isLoading } = useBrand();

    const [brandLogo, setBrandLogo] = useState<string | null>(
        brandToEdit?.logo || null
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<BrandFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: brandToEdit?.name || '',
            description: brandToEdit?.description || '',
            website: brandToEdit?.website || '',
            discount: brandToEdit?.discount || null,
            status: brandToEdit?.status || 'active',
        },
    });

    useEffect(() => {
        if (brandToEdit) {
            setValue('name', brandToEdit.name);
            setValue('description', brandToEdit.description || '');
            setValue('website', brandToEdit.website || '');
            setValue('discount', brandToEdit.discount || null);
            setValue('status', brandToEdit.status || 'active');
            setBrandLogo(brandToEdit.logo || null);
        }
    }, [brandToEdit, setValue]);

    const handleImageUpdate = (imageUrl: string | null) => {
        setBrandLogo(imageUrl);
    };

    const onSubmit = async (data: BrandFormData) => {
        const brandData = {
            name: data.name,
            description: data.description || '',
            logo: brandLogo,
            website: data.website || '',
            discount: data.discount,
            status: data.status,
        };

        try {
            if (brandToEdit) {
                // Update existing brand
                if (!brandToEdit.id) {
                    toast.error('Cannot update brand: Missing ID');
                    return;
                }
                await editBrand(brandToEdit.id, brandData);
                getAllBrands();
                toast.success('Brand updated successfully');
            } else {
                 await addBrand(brandData);
                getAllBrands();
                toast.success('Brand created successfully');
                reset();
                setBrandLogo(null);
            }
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            toast.error('Failed to save brand');
        }
    };

    // Cancel form
    const handleCancel = () => {
        reset();
        setBrandLogo(null);

        if (onSuccess) {
            onSuccess();
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-lg text-center font-semibold pt-5">
                {brandToEdit ? 'Update Brand' : 'Create Brand'}
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full px-6 py-3 flex flex-col"
            >
                <Input
                    label="Brand Name"
                    placeholder="Enter Brand Name"
                    required={true}
                    name="name"
                    register={register('name')}
                    errors={errors}
                />

                <div className="mt-4">
                    <label className="text-sm font-robotoSlab py-1 block">
                        Description
                    </label>
                    <textarea
                        {...register('description')}
                        placeholder="Enter brand description"
                        className="w-full border border-CloudGray rounded-[10px] px-3 py-2 outline-none resize-none"
                        rows={3}
                    />
                </div>

                <Input
                    label="Website"
                    placeholder="Enter brand's website URL"
                    name="website"
                    register={register('website')}
                    errors={errors}
                    className="mt-4"
                />

                <Input
                    label="Discount (%)"
                    placeholder="Enter discount percentage"
                    type="number"
                    name='discount'
                    register={register('discount', {
                        setValueAs: (value) => (value === '' ? null : Number(value)),
                    })}
                    errors={errors}
                    className="mt-4"
                />
                <div className="mt-4">
                    <label className="text-sm font-robotoSlab py-1 block">
                        Status
                    </label>
                    <select
                        {...register('status')}
                        className="w-full border border-CloudGray rounded-[10px] px-3 py-2 outline-none"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="mt-4">
                    <ImageUploader
                        onImageChange={handleImageUpdate}
                        initialImage={brandLogo}
                        entityType="brand"
                    />
                </div>

                <div className="w-full flex items-center justify-between gap-4 my-6">
                    <Button
                        type="submit"
                        label={isLoading ? <Spinner /> : brandToEdit ? 'Update' : 'Save'}
                        className="!w-[183px]"
                        disabled={isLoading}
                    />
                    <button
                        type="button"
                        className="border border-secondary rounded-xl py-[5px] w-[183px]"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BrandForm;