import axios from 'axios';
import {
  Brand,
  CreateBrandRequest,
  UpdateBrandRequest,
  GetAllBrandsParams,
  GetBrandsWithProductCountParams,
  PaginatedResponse,
  BrandWithProductCount,
  UpdateDiscountRequest,
  BulkDeleteRequest
} from '@/types/brandTypes';

const API_BASE_URL ="https://api.tareequlshifa.com/api/v1"
const BRAND_API_URL = `${API_BASE_URL}/brand`;

// Create a new brand
export const createBrand = async (brandData: CreateBrandRequest): Promise<Brand> => {
  const response = await axios.post(BRAND_API_URL, brandData);
  return response.data;
};

// Update an existing brand
export const updateBrand = async (id: string, brandData: UpdateBrandRequest): Promise<Brand> => {
  const response = await axios.put(`${BRAND_API_URL}/${id}`, brandData);
  return response.data;
};

// Get all brands with pagination and filters
export const getAllBrands = async (params: GetAllBrandsParams = {}): Promise<PaginatedResponse<Brand>> => {
  const response = await axios.get(BRAND_API_URL, { params });
  return response.data;
};

// Get a specific brand by ID
export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await axios.get(`${BRAND_API_URL}/${id}`);
  return response.data;
};

// Delete a brand
export const deleteBrand = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${BRAND_API_URL}/${id}`);
  return response.data;
};

// Bulk delete brands
export const bulkDeleteBrands = async (data: BulkDeleteRequest): Promise<{ message: string }> => {
  const response = await axios.post(`${BRAND_API_URL}/bulk-delete`, data);
  return response.data;
};

// Update brand discount
export const updateBrandDiscount = async (id: string, data: UpdateDiscountRequest): Promise<Brand> => {
  const response = await axios.patch(`${BRAND_API_URL}/discount/${id}`, data);
  return response.data;
};

// Get brands with product count
export const getBrandsWithProductCount = async (
  params: GetBrandsWithProductCountParams = {}
): Promise<PaginatedResponse<BrandWithProductCount>> => {
  const response = await axios.get(`${BRAND_API_URL}/product-count`, { params });
  return response.data;
};