// src/redux/slices/prescription.slice.ts
import { createSlice } from '@reduxjs/toolkit';
import {
  createPrescription,
  getPrescription,
  getPrescriptionByNumber,
  getUserPrescriptions,
  getAllPrescriptions,
  updatePrescription,
  getPrescriptionStats
} from '../thunk/prescription.thunk';
import { PrescriptionState } from '@/types/prescription.types';

// Initial state
const initialState: PrescriptionState = {
  prescriptions: [],
  currentPrescription: null,
  isLoading: false,
  error: null,
  stats: null,
  meta: null
};

// Create slice
const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    clearPrescriptions: (state) => {
      state.prescriptions = [];
      state.meta = null;
    },
    clearCurrentPrescription: (state) => {
      state.currentPrescription = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Create prescription
    builder
      .addCase(createPrescription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPrescription = action.payload.data;
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get prescription by ID
    builder
      .addCase(getPrescription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPrescription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPrescription = action.payload.data;
      })
      .addCase(getPrescription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get prescription by number
    builder
      .addCase(getPrescriptionByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPrescriptionByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPrescription = action.payload.data;
      })
      .addCase(getPrescriptionByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get user prescriptions
    builder
      .addCase(getUserPrescriptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPrescriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prescriptions = action.payload.data;
        state.meta = action.payload.meta || null;
      })
      .addCase(getUserPrescriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Admin: Get all prescriptions
    builder
      .addCase(getAllPrescriptions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPrescriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prescriptions = action.payload.data;
        state.meta = action.payload.meta || null;
      })
      .addCase(getAllPrescriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Admin: Update prescription status
    builder
      .addCase(updatePrescription.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePrescription.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // Update current prescription if it's the one being updated
        if (state.currentPrescription && state.currentPrescription.id === action.payload.data.id) {
          state.currentPrescription = action.payload.data;
        }
        
        // Update in the prescriptions list if it exists there
        state.prescriptions = state.prescriptions.map(prescription => 
          prescription.id === action.payload.data.id ? action.payload.data : prescription
        );
      })
      .addCase(updatePrescription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Admin: Get prescription statistics
    builder
      .addCase(getPrescriptionStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPrescriptionStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.data;
      })
      .addCase(getPrescriptionStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPrescriptions, clearCurrentPrescription, clearError } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;