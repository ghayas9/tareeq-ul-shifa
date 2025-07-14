// src/hooks/product.hook.ts
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  fetchProductsByCategory,
  uploadProductImage,
} from '../redux/thunk/product.thunk';
import {
  clearProductError,
  resetProduct,
  setCurrentPage,
} from '../redux/slices/productSlice';
import {
  ProductQueryParams,
  CreateProductData,
  UpdateProductData,
  DeleteManyProductsData,
} from '../types/productTypes';
import toast from 'react-hot-toast';
import { RootState } from '../redux/store/store';
import { productApi } from '@/services/product.api';

export const useProduct = () => {
  const dispatch = useDispatch<any>();
  const { products, product, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.product
  );

  // Get all products with optional filtering
  const getAllProducts = useCallback(
    async (params: ProductQueryParams = {}) => {
      try {
        // Add unique timestamp to prevent cache conflicts
        const uniqueParams = {
          ...params,
          _t: Date.now(),
        };

        const response = await dispatch(fetchProducts(uniqueParams));
        return response;
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch products');
        throw err;
      }
    },
    [dispatch]
  );

  // Get top selling products
  const getTopSellingProducts = useCallback(
    async (params: ProductQueryParams = {}) => {
      try {
        // The backend specifically handles the 'topSell' sort for top selling products
        const topSellingParams: ProductQueryParams = {
          sort: 'topSell',
          order: 'desc',
          status: 'active',
          limit: params.limit || 10,
          ...params,
        };

        // Use direct API call to prevent state conflicts
        const response = await productApi.getAll(topSellingParams);
        return { payload: response };
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch top selling products');
        throw err;
      }
    },
    []
  );

  // Get a single product
  const getProductById = useCallback(
    async (id: string) => {
      try {
        return await dispatch(fetchProduct(id));
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch product');
        throw err;
      }
    },
    [dispatch]
  );

  // Alias for getProductById for compatibility
  const getProduct = useCallback(
    async (id: string) => {
      return getProductById(id);
    },
    [getProductById]
  );

  // Get products by category
  const getProductsByCategory = useCallback(
    async ({
      categoryId,
      params = {},
    }: {
      categoryId: string;
      params?: Omit<ProductQueryParams, 'category'>;
    }) => {
      try {
        // Make sure categoryId is a string
        if (typeof categoryId !== 'string') {
          console.error(
            'Invalid categoryId type:',
            typeof categoryId,
            categoryId
          );

          // If categoryId is an object with an id property, use that
          if (
            categoryId &&
            typeof categoryId === 'object' &&
            'id' in categoryId
          ) {
            categoryId = (categoryId as any).id;
          } else {
            throw new Error('Invalid category ID format');
          }
        }

        // Create params with category ID
        const categoryParams = {
          ...params,
          category: categoryId,
        };

        // Use direct API call to prevent state conflicts
        const response = await productApi.getAll(categoryParams);
        return { payload: response };
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch products by category');
        throw err;
      }
    },
    []
  );

  // Create a new product
  const createNewProduct = useCallback(
    async (data: CreateProductData) => {
      try {
        const response = await dispatch(createProduct(data));
        toast.success('Product created successfully!');
        return response;
      } catch (err: any) {
        toast.error(err.message || 'Failed to create product');
        throw err;
      }
    },
    [dispatch]
  );

  // Alias for createNewProduct
  const addProduct = useCallback(
    async (data: CreateProductData) => {
      return createNewProduct(data);
    },
    [createNewProduct]
  );

  // Update an existing product
  const updateExistingProduct = useCallback(
    async (data: UpdateProductData) => {
      try {
        const response = await dispatch(updateProduct(data));
        toast.success('Product updated successfully!');
        return response;
      } catch (err: any) {
        toast.error(err.message || 'Failed to update product');
        throw err;
      }
    },
    [dispatch]
  );

  // Edit product (alternative interface for updateExistingProduct)
  const editProduct = useCallback(
    async (id: string, data: any) => {
      try {
        return await dispatch(updateProduct({ id, ...data }));
      } catch (error: any) {
        console.error(`Error updating product ${id}:`, error);
        toast.error(error.message || `Failed to update product ${id}`);
        throw error;
      }
    },
    [dispatch]
  );

  // Delete a product
  const deleteExistingProduct = useCallback(
    async (id: string) => {
      try {
        const response = await dispatch(deleteProduct(id));
        toast.success('Product deleted successfully!');
        return response;
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete product');
        throw err;
      }
    },
    [dispatch]
  );

  // Alias for deleteExistingProduct
  const removeProduct = useCallback(
    async (id: string) => {
      return deleteExistingProduct(id);
    },
    [deleteExistingProduct]
  );

  // Bulk delete products
  const deleteManyProducts = useCallback(
    async (data: DeleteManyProductsData) => {
      try {
        const response = await dispatch(bulkDeleteProducts(data));
        toast.success('Products deleted successfully!');
        return response;
      } catch (err: any) {
        toast.error(err.message || 'Failed to delete products');
        throw err;
      }
    },
    [dispatch]
  );

  // Alias for deleteManyProducts
  const removeMultipleProducts = useCallback(
    async (data: DeleteManyProductsData) => {
      return deleteManyProducts(data);
    },
    [deleteManyProducts]
  );

  // Upload product image
  const uploadImage = useCallback(
    async (file: File) => {
      try {
        const response = await dispatch(uploadProductImage(file));
        return response.payload;
      } catch (err: any) {
        toast.error(err.message || 'Failed to upload image');
        throw err;
      }
    },
    [dispatch]
  );

  // Change current page (for pagination)
  const changePage = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  // Clear any error
  const clearError = useCallback(() => {
    dispatch(clearProductError());
  }, [dispatch]);

  // Reset selected product
  const resetSelectedProduct = useCallback(() => {
    dispatch(resetProduct());
  }, [dispatch]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  return {
    products,
    product,
    isLoading,
    error,
    pagination,
    // Original methods
    getAllProducts,
    getTopSellingProducts,
    getProductById,
    getProductsByCategory,
    createNewProduct,
    updateExistingProduct,
    deleteExistingProduct,
    deleteManyProducts,
    uploadImage,
    changePage,
    clearError,
    resetProduct: resetSelectedProduct,
    // Alternative method names
    getProduct,
    addProduct,
    editProduct,
    removeProduct,
    removeMultipleProducts,
  };
};
