// src/services/category.api.ts
import axios from 'axios';
import { CategoryResponse } from '../types/categoryTypes';
import { api } from '@/config/constants';



// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const categoryApi = {
  // Get all categories
  getAll: async (): Promise<CategoryResponse> => {
    const response = await api.get('/category');
    console.log(response,"get all")
    return response.data;
  },

  // Get a single category
  getOne: async (id: string): Promise<CategoryResponse> => {
    const response = await api.get(`/category/${id}`);
    return response.data;
  },

  // Create a new category
  create: async (formData: FormData): Promise<CategoryResponse> => {
    const response = await api.post('/category', formData);
    return response.data;
  },

  // Update a category
  update: async (id: string, formData: FormData): Promise<CategoryResponse> => {
    const response = await api.put(`/category/${id}`, formData);
    return response.data;
  },

  // Delete a category
  delete: async (id: string): Promise<CategoryResponse> => {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  },
};
