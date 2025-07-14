export interface Product {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice: number | null;
  image: string | null;
  status: 'pending' | 'inactive' | 'active';
  description: string | null;
  ingredients: string | null;
  uses: string | null;
  dosage: string | null;
  warnings: string | null;
  quantity: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface CreateProductData {
  categoryId: string;
  name: string;
  brand: string;
  sku: string;
  price: number;
  originalPrice?: number | null;
  image?: string | null;
  status?: 'pending' | 'inactive' | 'active';
  description?: string | null;
  ingredients?: string | null;
  uses?: string | null;
  dosage?: string | null;
  warnings?: string | null;
  quantity?: number | null;
}

export interface UpdateProductData {
  id: string;
  categoryId?: string;
  name?: string;
  brand?: string;
  sku?: string;
  price?: number;
  originalPrice?: number | null;
  image?: string | null;
  status?: 'pending' | 'inactive' | 'active';
  description?: string | null;
  ingredients?: string | null;
  uses?: string | null;
  dosage?: string | null;
  warnings?: string | null;
  quantity?: number | null;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product | Product[];
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: string;
  brand?: string;
  inStock?: boolean | string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface DeleteManyProductsData {
  ids: string[];
}
