// Types for Brand
export interface Brand {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  website: string | null;
  discount: number | null;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

// Request types
export interface CreateBrandRequest {
  name: string;
  description?: string | null;
  logo?: string | null;
  website?: string | null;
  discount?: number | null;
  status?: 'active' | 'inactive';
}

export interface UpdateBrandRequest extends Partial<CreateBrandRequest> {}

export interface UpdateDiscountRequest {
  discount: number;
}

export interface BulkDeleteRequest {
  ids: string[];
}

// Query params for getting brands
export interface GetAllBrandsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
  minDiscount?: number;
  maxDiscount?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface GetBrandsWithProductCountParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive';
}

// Response types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BrandWithProductCount extends Brand {
  productCount: number;
}

// State interface for Redux
export interface BrandState {
  brands: Brand[];
  brandsWithProductCount: BrandWithProductCount[];
  currentBrand: Brand | null;
  isLoading: boolean;
  error: string | null;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}
