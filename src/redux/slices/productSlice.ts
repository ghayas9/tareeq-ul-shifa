// src/redux/slices/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from '../../types/productTypes';
import {
  fetchProducts,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
  fetchProductsByCategory,
  fetchProductsByBrand,
} from '../thunk/product.thunk';

// Initial state
const initialState: ProductState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
  pagination: {
    total: 0,
    currentPage: 1,
    totalPages: 1,
  },
};

// Create the product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // Clear any errors
    clearProductError: (state) => {
      state.error = null;
    },
    // Reset selected product
    resetProduct: (state) => {
      state.product = null;
    },
    // Set current page
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = Array.isArray(action.payload.data)
          ? action.payload.data
          : [action.payload.data];

        // Update pagination data if available
        if (action.payload.total !== undefined) {
          state.pagination.total = action.payload.total;
        }
        if (action.payload.totalPages !== undefined) {
          state.pagination.totalPages = action.payload.totalPages;
        }
        if (action.payload.currentPage !== undefined) {
          state.pagination.currentPage = action.payload.currentPage;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch single product
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload as any;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle potential array response or single product response
        const newProduct = Array.isArray(action.payload.data)
          ? action.payload.data[0]
          : action.payload.data;

        if (newProduct) {
          state.products.unshift(newProduct);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle potential array response or single product response
        const updatedProduct = Array.isArray(action.payload.data)
          ? action.payload.data[0]
          : action.payload.data;

        if (updatedProduct) {
          // Update in products array
          const index = state.products.findIndex(
            (item) => item.id === updatedProduct.id
          );
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }

          // Update selected product
          state.product = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove from products array
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );

        // Reset selected product if it was deleted
        if (state.product && state.product.id === action.payload.id) {
          state.product = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Bulk delete products
    builder
      .addCase(bulkDeleteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bulkDeleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove deleted products from array
        const deletedIds = action.payload.ids;
        state.products = state.products.filter(
          (product) => !deletedIds.includes(product.id)
        );

        // Reset selected product if it was deleted
        if (state.product && deletedIds.includes(state.product.id)) {
          state.product = null;
        }
      })
      .addCase(bulkDeleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch products by category
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = Array.isArray(action.payload.data)
          ? action.payload.data
          : [action.payload.data];

        // Update pagination data if available
        if (action.payload.total !== undefined) {
          state.pagination.total = action.payload.total;
        }
        if (action.payload.totalPages !== undefined) {
          state.pagination.totalPages = action.payload.totalPages;
        }
        if (action.payload.currentPage !== undefined) {
          state.pagination.currentPage = action.payload.currentPage;
        }
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(fetchProductsByBrand.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = Array.isArray(action.payload.data)
          ? action.payload.data
          : [action.payload.data];

        // Update pagination data if available
        if (action.payload.total !== undefined) {
          state.pagination.total = action.payload.total;
        }
        if (action.payload.totalPages !== undefined) {
          state.pagination.totalPages = action.payload.totalPages;
        }
        if (action.payload.currentPage !== undefined) {
          state.pagination.currentPage = action.payload.currentPage;
        }
      })
      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProductError, resetProduct, setCurrentPage } =
  productSlice.actions;
export default productSlice.reducer;
