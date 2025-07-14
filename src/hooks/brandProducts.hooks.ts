// src/hooks/brandProducts.hook.ts
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductsByBrand, 
  fetchProduct,
} from '../redux/thunk/product.thunk';
import { 
  getBrandByIdThunk,
} from '../redux/thunk/brand.thunk';
import { ProductQueryParams } from '@/types/productTypes';
import { useCallback } from 'react';
import { RootState } from '@/redux/store/store';

export const useBrandProducts = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    isLoading: productsLoading, 
    error: productsError,
    pagination 
  } = useSelector((state: RootState) => state.product);
  
  const { 
    currentBrand, 
    isLoading: brandLoading,
    error: brandError 
  } = useSelector((state: RootState) => state.brand);

  const getProductsByBrand = useCallback(
    async ({ 
      brandId, 
      params = {} 
    }: { 
      brandId: string; 
      params?: Omit<ProductQueryParams, 'brand'> 
    }) => {
      try {
        // Fetch the brand details
        await dispatch(getBrandByIdThunk(brandId) as any);
        
        // Then fetch the products associated with this brand
        const response = await dispatch(
          fetchProductsByBrand({ brandId, params }) as any
        );
        
        return response.payload;
      } catch (error) {
        console.error('Error fetching brand products:', error);
        throw error;
      }
    }, [dispatch]
  );

  return {
    products,
    brand: currentBrand,
    isLoading: productsLoading || brandLoading,
    error: productsError || brandError,
    pagination,
    getProductsByBrand,
  };
};

export default useBrandProducts;