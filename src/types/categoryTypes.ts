// src/types/categoryTypes.ts

export interface Category {
    id: string;
    name: string;
    image?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CategoryState {
    categories: Category[];
    category: Category | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface CreateCategoryData {
    name: string;
    description?: string;
    image?: File;
  }
  
  export interface UpdateCategoryData {
    id: string;
    name?: string;
    description?: string;
    image?: File;
  }
  
  export interface CategoryResponse {
    success: boolean;
    message: string;
    data: Category | Category[];
  }