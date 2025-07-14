// src/redux/thunks/prescription.thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { prescriptionApi } from '../../services/prescription.api';
import {
  CreatePrescriptionPayload,
  UpdatePrescriptionPayload,
  PrescriptionFilterParams
} from '../../types/prescription.types';
import toast from 'react-hot-toast';

// Create prescription thunk
export const createPrescription = createAsyncThunk(
  'prescription/create',
  async (data: CreatePrescriptionPayload, { rejectWithValue }) => {
    try {
      const response = await prescriptionApi.createPrescription(data);
      toast.success(response.message || 'Prescription uploaded successfully');
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to upload prescription');
      return rejectWithValue(error.response?.data?.message || 'Failed to upload prescription');
    }
  }
);

// Get prescription by ID
export const getPrescription = createAsyncThunk(
  'prescription/getById',
  async (prescriptionId: string, { rejectWithValue }) => {
    try {
      const response = await prescriptionApi.getPrescription(prescriptionId);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch prescription');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch prescription');
    }
  }
);

// Get prescription by number
export const getPrescriptionByNumber = createAsyncThunk(
  'prescription/getByNumber',
  async (prescriptionNumber: string, { rejectWithValue }) => {
    try {
      const response = await prescriptionApi.getPrescriptionByNumber(prescriptionNumber);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch prescription');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch prescription');
    }
  }
);

// Get user prescriptions
export const getUserPrescriptions = createAsyncThunk(
    'prescription/getUserPrescriptions',
    async ({ filters }: { filters?: PrescriptionFilterParams } = {}, { rejectWithValue }) => {
      try {
        const response = await prescriptionApi.getUserPrescriptions(filters);
        return response;
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to fetch prescriptions');
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch prescriptions');
      }
    }
  );
  
// Admin: Get all prescriptions
export const getAllPrescriptions = createAsyncThunk(
  'prescription/getAllPrescriptions',
  async ({ filters }: { filters?: PrescriptionFilterParams } = {}, { rejectWithValue }) => {
    try {
      const response = await prescriptionApi.getAllPrescriptions(filters);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch prescriptions');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch prescriptions');
    }
  }
);

// Admin: Update prescription status
export const updatePrescription = createAsyncThunk(
  'prescription/updateStatus',
  async (
    { prescriptionId, data }: { prescriptionId: string; data: UpdatePrescriptionPayload }, 
    { rejectWithValue }
  ) => {
    try {
      const response = await prescriptionApi.updatePrescription(prescriptionId, data);
      toast.success(response.message || `Prescription status updated to ${data.status}`);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update prescription status');
      return rejectWithValue(error.response?.data?.message || 'Failed to update prescription status');
    }
  }
);

// Admin: Get prescription statistics
export const getPrescriptionStats = createAsyncThunk(
  'prescription/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await prescriptionApi.getPrescriptionStats();
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch prescription statistics');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch prescription statistics');
    }
  }
);