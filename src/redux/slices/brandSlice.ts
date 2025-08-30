import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BrandState,
  Brand,
  BrandWithProductCount,
  PaginatedResponse,
} from '@/types/brandTypes';
import {
  createBrandThunk,
  updateBrandThunk,
  getAllBrandsThunk,
  getBrandByIdThunk,
  deleteBrandThunk,
  bulkDeleteBrandsThunk,
  updateBrandDiscountThunk,
  getBrandsWithProductCountThunk,
} from '../thunk/brand.thunk';

const initialState: BrandState = {
  brands: [],
  brandsWithProductCount: [],
  currentBrand: null,
  isLoading: false,
  error: null,
  meta: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    clearBrandError: (state) => {
      state.error = null;
    },
    clearCurrentBrand: (state) => {
      state.currentBrand = null;
    },
    setCurrentBrand: (state, action: PayloadAction<Brand | null>) => {
      state.currentBrand = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create brand
    builder.addCase(createBrandThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      createBrandThunk.fulfilled,
      (state, action: PayloadAction<Brand>) => {
        state.isLoading = false;
        state.brands.push(action.payload);
      }
    );
    builder.addCase(createBrandThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update brand
    builder.addCase(updateBrandThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateBrandThunk.fulfilled,
      (state, action: PayloadAction<Brand>) => {
        state.isLoading = false;
        const index = state.brands.findIndex(
          (brand) => brand.id === action.payload.id
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
        if (state.currentBrand?.id === action.payload.id) {
          state.currentBrand = action.payload;
        }
      }
    );
    builder.addCase(updateBrandThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Get all brands
    builder.addCase(getAllBrandsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getAllBrandsThunk.fulfilled,
      (state, action: PayloadAction<PaginatedResponse<Brand>>) => {
        state.isLoading = false;
        state.brands = action.payload.data;
        state.meta = action.payload;
      }
    );
    builder.addCase(getAllBrandsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Get brand by ID
    builder.addCase(getBrandByIdThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getBrandByIdThunk.fulfilled,
      (state, action: PayloadAction<Brand>) => {
        state.isLoading = false;
        state.currentBrand = action.payload;
      }
    );
    builder.addCase(getBrandByIdThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete brand
    builder.addCase(deleteBrandThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      deleteBrandThunk.fulfilled,
      (state, action: PayloadAction<{ id: string } | { message: string }>) => {
        state.isLoading = false;

        // Proper handling of the response - extract ID from response or thunk arg properly
        // Check if the response contains an ID directly
        let deletedId: string | undefined;

        if ('id' in action.payload) {
          // If backend returns the deleted ID
          deletedId = action.payload.id;
        }

        if (deletedId) {
          state.brands = state.brands.filter((brand) => brand.id !== deletedId);
          if (state.currentBrand?.id === deletedId) {
            state.currentBrand = null;
          }
        }
      }
    );
    builder.addCase(deleteBrandThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Bulk delete brands
    builder.addCase(bulkDeleteBrandsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      bulkDeleteBrandsThunk.fulfilled,
      (
        state,
        action: PayloadAction<{ ids?: string[] } | { message: string }>
      ) => {
        state.isLoading = false;

        // Properly extract the deleted IDs
        let deletedIds: string[] = [];

        if ('ids' in action.payload && Array.isArray(action.payload.ids)) {
          // If backend returns the ids array directly
          deletedIds = action.payload.ids;
        }

        if (deletedIds.length > 0) {
          state.brands = state.brands.filter(
            (brand) => !deletedIds.includes(brand.id)
          );
          if (
            state.currentBrand &&
            deletedIds.includes(state.currentBrand.id)
          ) {
            state.currentBrand = null;
          }
        }
      }
    );
    builder.addCase(bulkDeleteBrandsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update brand discount
    builder.addCase(updateBrandDiscountThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      updateBrandDiscountThunk.fulfilled,
      (state, action: PayloadAction<Brand>) => {
        state.isLoading = false;
        const index = state.brands.findIndex(
          (brand) => brand.id === action.payload.id
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
        if (state.currentBrand?.id === action.payload.id) {
          state.currentBrand = action.payload;
        }
      }
    );
    builder.addCase(updateBrandDiscountThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Get brands with product count
    builder.addCase(getBrandsWithProductCountThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      getBrandsWithProductCountThunk.fulfilled,
      (
        state,
        action: PayloadAction<PaginatedResponse<BrandWithProductCount>>
      ) => {
        state.isLoading = false;
        state.brandsWithProductCount = action.payload.data;
        state.meta = action.payload;
      }
    );
    builder.addCase(
      getBrandsWithProductCountThunk.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      }
    );
  },
});

export const { clearBrandError, clearCurrentBrand, setCurrentBrand } =
  brandSlice.actions;
export default brandSlice.reducer;
