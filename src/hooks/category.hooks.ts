// src/hooks/category.hooks.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  fetchCategories,
  fetchCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../redux/thunk/category.thunk';
import { clearCategoryError, resetCategory } from '../redux/slices/categorySlice';

export const useCategory = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      return await dispatch(fetchCategories()).unwrap();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  // Fetch a single category
  const getCategory = async (id: string) => {
    try {
      return await dispatch(fetchCategory(id)).unwrap();
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  };

  // Create a new category
  const addCategory = async (formData: FormData) => {
    try {
      return await dispatch(createCategory(formData)).unwrap();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };

  // Update a category
  const editCategory = async (id: string, formData: FormData) => {
    try {
      return await dispatch(updateCategory({ id, formData })).unwrap();
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  };

  // Delete a category
  const removeCategory = async (id: string) => {
    try {
      return await dispatch(deleteCategory(id)).unwrap();
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  };

  // Clear any errors
  const handleClearError = () => {
    dispatch(clearCategoryError());
  };

  // Reset selected category
  const handleResetCategory = () => {
    dispatch(resetCategory());
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      handleClearError();
    };
  }, []);

  return {
    ...category,
    getAllCategories,
    getCategory,
    addCategory,
    editCategory,
    removeCategory,
    clearError: handleClearError,
    resetCategory: handleResetCategory,
  };
};