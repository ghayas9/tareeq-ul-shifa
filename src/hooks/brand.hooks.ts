import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createBrandThunk,
    updateBrandThunk,
    getAllBrandsThunk,
    getBrandByIdThunk,
    deleteBrandThunk,
    bulkDeleteBrandsThunk,
    updateBrandDiscountThunk,
    getBrandsWithProductCountThunk
} from '../redux/thunk/brand.thunk';
import { clearBrandError, clearCurrentBrand, setCurrentBrand } from '../redux/slices/brandSlice';
import {
    CreateBrandRequest,
    UpdateBrandRequest,
    GetAllBrandsParams,
    GetBrandsWithProductCountParams,
    UpdateDiscountRequest,
    BulkDeleteRequest,
    Brand
} from '@/types/brandTypes';
import { AppDispatch, RootState } from '@/redux/store/store';

export const useBrand = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        brands,
        brandsWithProductCount,
        currentBrand,
        isLoading,
        error,
        meta
    } = useSelector((state: RootState) => state.brand);

    // Create a new brand
    const addBrand = useCallback(
        async (brandData: CreateBrandRequest) => {
            return dispatch(createBrandThunk(brandData)).unwrap();
        },
        [dispatch]
    );

    // Update an existing brand
    const editBrand = useCallback(
        async (id: string, brandData: UpdateBrandRequest) => {
            return dispatch(updateBrandThunk({ id, data: brandData })).unwrap();
        },
        [dispatch]
    );

    // Get all brands
    const getAllBrands = useCallback(
        async (params: GetAllBrandsParams = {}) => {
            return dispatch(getAllBrandsThunk(params)).unwrap();
        },
        [dispatch]
    );

    // Get a specific brand by ID
    const getBrandById = useCallback(
        async (id: string) => {
            return dispatch(getBrandByIdThunk(id)).unwrap();
        },
        [dispatch]
    );

    // Delete a brand
    const deleteBrand = useCallback(
        async (id: string) => {
            return dispatch(deleteBrandThunk(id)).unwrap();
        },
        [dispatch]
    );

    // Bulk delete brands
    const bulkDeleteBrands = useCallback(
        async (data: BulkDeleteRequest) => {
            return dispatch(bulkDeleteBrandsThunk(data)).unwrap();
        },
        [dispatch]
    );

    // Update brand discount
    const updateDiscount = useCallback(
        async (id: string, discount: number) => {
            return dispatch(updateBrandDiscountThunk({ id, data: { discount } })).unwrap();
        },
        [dispatch]
    );

    // Get brands with product count
    const getBrandsWithProductCount = useCallback(
        async (params: GetBrandsWithProductCountParams = {}) => {
            return dispatch(getBrandsWithProductCountThunk(params)).unwrap();
        },
        [dispatch]
    );

    // Set current brand (for editing)
    const selectBrand = useCallback(
        (brand: Brand | null) => {
            dispatch(setCurrentBrand(brand));
        },
        [dispatch]
    );

    // Clear current brand selection
    const clearSelection = useCallback(() => {
        dispatch(clearCurrentBrand());
    }, [dispatch]);

    // Clear any errors
    const resetError = useCallback(() => {
        dispatch(clearBrandError());
    }, [dispatch]);

    return {
        // State
        brands,
        brandsWithProductCount,
        currentBrand,
        isLoading,
        error,
        meta,

        // Actions
        addBrand,
        editBrand,
        getAllBrands,
        getBrandById,
        deleteBrand,
        bulkDeleteBrands,
        updateDiscount,
        getBrandsWithProductCount,
        selectBrand,
        clearSelection,
        clearError: resetError
    };
};

export default useBrand;