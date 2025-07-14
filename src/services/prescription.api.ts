// src/services/prescription.api.ts
import { 
    CreatePrescriptionPayload,
    UpdatePrescriptionPayload,
    Prescription,
    PrescriptionFilterParams,
    PrescriptionStats,
    ApiResponse,
    PaginationMeta
  } from '../types/prescription.types';
  import { api } from '@/config/constants';
  
  export const prescriptionApi = {
    // Create a new prescription
    createPrescription: async (data: CreatePrescriptionPayload): Promise<ApiResponse<Prescription>> => {
      const response = await api.post('/prescription', data);
      return response.data;
    },
  
    // Get a specific prescription by ID
    getPrescription: async (prescriptionId: string): Promise<ApiResponse<Prescription>> => {
      const response = await api.get(`/prescription/${prescriptionId}`);
      return response.data;
    },
  
    // Get a specific prescription by prescription number
    getPrescriptionByNumber: async (prescriptionNumber: string): Promise<ApiResponse<Prescription>> => {
      const response = await api.get(`/prescription/by-number/${prescriptionNumber}`);
      return response.data;
    },
  
    // Get all prescriptions for the authenticated user
    getUserPrescriptions: async (filters?: PrescriptionFilterParams): Promise<ApiResponse<Prescription[]>> => {
      // Build query string from filters
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        
        if (filters.status) params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);
        if (filters.fromDate) params.append('fromDate', filters.fromDate);
        if (filters.toDate) params.append('toDate', filters.toDate);
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.offset) params.append('offset', filters.offset.toString());
        
        queryString = params.toString() ? `?${params.toString()}` : '';
      }
      
      const response = await api.get(`/prescription/my-prescriptions${queryString}`);
      return response.data;
    },
  
    // Admin: Get all prescriptions
    getAllPrescriptions: async (filters?: PrescriptionFilterParams): Promise<ApiResponse<Prescription[]>> => {
      // Build query string from filters
      let queryString = '';
      if (filters) {
        const params = new URLSearchParams();
        
        if (filters.status) params.append('status', filters.status);
        if (filters.city) params.append('city', filters.city);
        if (filters.search) params.append('search', filters.search);
        if (filters.fromDate) params.append('fromDate', filters.fromDate);
        if (filters.toDate) params.append('toDate', filters.toDate);
        if (filters.limit) params.append('limit', filters.limit.toString());
        if (filters.offset) params.append('offset', filters.offset.toString());
        
        queryString = params.toString() ? `?${params.toString()}` : '';
      }
      
      const response = await api.get(`/prescription/admin/all${queryString}`);
      return response.data;
    },
  
    // Admin: Update prescription status
    updatePrescription: async (
      prescriptionId: string, 
      data: UpdatePrescriptionPayload
    ): Promise<ApiResponse<Prescription>> => {
      const response = await api.patch(`/prescription/admin/${prescriptionId}`, data);
      return response.data;
    },
  
    // Admin: Get prescription statistics
    getPrescriptionStats: async (): Promise<ApiResponse<PrescriptionStats>> => {
      const response = await api.get('/prescription/admin/stats');
      return response.data;
    }
  };