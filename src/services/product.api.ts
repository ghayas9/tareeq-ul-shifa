// src/services/product.api.ts
import { api } from '@/config/constants';
import { 
  ProductResponse, 
  CreateProductData, 
  UpdateProductData, 
  ProductQueryParams,
  DeleteManyProductsData
} from '../types/productTypes';


// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const productApi = {
  getAll: async (params: ProductQueryParams = {}): Promise<ProductResponse> => {
    const response = await api.get('/product', { params });
    return response.data;
  },

  // Get a single product
  getOne: async (id: string): Promise<ProductResponse> => {
    const response = await api.get(`/product/${id}`);
    return response.data;
  },

  // Create a new product
  create: async (data: CreateProductData): Promise<ProductResponse> => {
    const response = await api.post('/product', data);
    return response.data;
  },

  // Update a product
  update: async (id: string, data: Omit<UpdateProductData, 'id'>): Promise<ProductResponse> => {
    const response = await api.put(`/product/${id}`, data);
    return response.data;
  },

  // Delete a product
  delete: async (id: string): Promise<ProductResponse> => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  },

  // Bulk delete products
  bulkDelete: async (data: DeleteManyProductsData): Promise<ProductResponse> => {
    const response = await api.post('/product/bulk-delete', data);
    return response.data;
  },

  // Get products by category
  getByCategory: async (categoryId: string, params: Omit<ProductQueryParams, 'category'> = {}): Promise<ProductResponse> => {
    const response = await api.get(`/product/category/${categoryId}`, { params });
    return response.data;
  },
  getByBrand: async (brandId: string, params: Omit<ProductQueryParams, 'brand'> = {}): Promise<ProductResponse> => {
    const queryParams = { ...params, brand: brandId };
    const response = await api.get('/product', { params: queryParams });
    return response.data;
  },
  // Upload product image
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};