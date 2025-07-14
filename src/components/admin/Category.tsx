'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../common/Input';
import Button from '../common/Button';
import { useCategory } from '@/hooks/category.hooks';
import toast from 'react-hot-toast';
import { Category } from '@/types/categoryTypes';
import ImageUploader from './ImageUploader';
import Spinner from '../Spinner';

// Form validation schema
const schema = z.object({
  name: z.string().min(1, 'Category Name is required'),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof schema>;

interface CategoryFormProps {
  categoryToEdit?: Category | null;
  onSuccess?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  categoryToEdit,
  onSuccess,
}) => {
  const { addCategory, editCategory,getAllCategories, clearError, isLoading } =
    useCategory() as any;

  const [categoryImage, setCategoryImage] = useState<string | null>(
    categoryToEdit?.image || null
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: categoryToEdit?.name || '',
      description: categoryToEdit?.description || '',
    },
  });
  useEffect(() => {
    if (categoryToEdit) {
      setValue('name', categoryToEdit.name);
      setValue('description', categoryToEdit.description || '');
      setCategoryImage(categoryToEdit.image || null);
    }
  }, [categoryToEdit, setValue]);

  const handleImageUpdate = (imageUrl: string | null) => {
    setCategoryImage(imageUrl);
  };
  const onSubmit = async (data: CategoryFormData) => {
    const categoryData = {
      name: data.name,
      description: data.description || '',
      image: categoryImage,
    };

    try {
      if (categoryToEdit) {
        // Update existing category
        if (!categoryToEdit.id) {
          toast.error('Cannot update category: Missing ID');
          return;
        }
        await editCategory(categoryToEdit.id, categoryData);
        getAllCategories()
        toast.success('Category updated successfully');
      } else {
        await addCategory(categoryData);
        getAllCategories()
        toast.success('Category created successfully');
        reset();
        setCategoryImage(null);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toast.error('Failed to save category');
    }
  };

  // Cancel form
  const handleCancel = () => {
    reset();
    setCategoryImage(null);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-lg text-center font-semibold pt-5">
        {categoryToEdit ? 'Update Category' : 'Create Category'}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-6 py-3 flex flex-col"
      >
        <Input
          label="Category Name"
          placeholder="Enter Category Name"
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
            placeholder="Enter category description"
            className="w-full border border-CloudGray rounded-[10px] px-3 py-2 outline-none resize-none"
            rows={3}
          />
        </div>

        <div className="mt-4">
          <ImageUploader
            onImageChange={handleImageUpdate}
            initialImage={categoryImage}
            entityType="category"
          />
        </div>

        <div className="w-full flex items-center justify-between gap-4 my-6">
          <Button
            type="submit"
            label={isLoading ? <Spinner /> : categoryToEdit ? 'Update' : 'Save'}
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

export default CategoryForm;
