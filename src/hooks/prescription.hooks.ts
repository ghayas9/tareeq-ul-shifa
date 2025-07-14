// src/hooks/prescription.hooks.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  createPrescription,
  getPrescription,
  getPrescriptionByNumber,
  getUserPrescriptions,
  getAllPrescriptions,
  updatePrescription,
  getPrescriptionStats
} from '../redux/thunk/prescription.thunk';
import { 
  clearPrescriptions, 
  clearCurrentPrescription, 
  clearError 
} from '../redux/slices/prescription.slice';
import {
  CreatePrescriptionPayload,
  UpdatePrescriptionPayload,
  PrescriptionFilterParams
} from '../types/prescription.types';

export const usePrescription = () => {
  const dispatch = useAppDispatch();
  const prescription = useAppSelector((state: any) => state.prescription);

  const handleCreatePrescription = async (data: CreatePrescriptionPayload) => {
    return await dispatch(createPrescription(data)).unwrap();
  };

  const handleGetPrescription = async (prescriptionId: string) => {
    return await dispatch(getPrescription(prescriptionId)).unwrap();
  };

  const handleGetPrescriptionByNumber = async (prescriptionNumber: string) => {
    return await dispatch(getPrescriptionByNumber(prescriptionNumber)).unwrap();
  };

  const handleGetUserPrescriptions = async (filters?: PrescriptionFilterParams) => {
    return await dispatch(getUserPrescriptions({ filters })).unwrap();
  };
  
  const handleGetAllPrescriptions = async (filters?: PrescriptionFilterParams) => {
    return await dispatch(getAllPrescriptions({ filters })).unwrap();
  };

  const handleUpdatePrescription = async (prescriptionId: string, data: UpdatePrescriptionPayload) => {
    return await dispatch(updatePrescription({ prescriptionId, data })).unwrap();
  };

  const handleGetPrescriptionStats = async () => {
    return await dispatch(getPrescriptionStats()).unwrap();
  };

  const handleClearPrescriptions = () => {
    dispatch(clearPrescriptions());
  };

  const handleClearCurrentPrescription = () => {
    dispatch(clearCurrentPrescription());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    return () => {
      // Clear errors when component unmounts
      handleClearError();
    };
  }, []);

  return {
    ...prescription,
    createPrescription: handleCreatePrescription,
    getPrescription: handleGetPrescription,
    getPrescriptionByNumber: handleGetPrescriptionByNumber,
    getUserPrescriptions: handleGetUserPrescriptions,
    getAllPrescriptions: handleGetAllPrescriptions,
    updatePrescription: handleUpdatePrescription,
    getPrescriptionStats: handleGetPrescriptionStats,
    clearPrescriptions: handleClearPrescriptions,
    clearCurrentPrescription: handleClearCurrentPrescription,
    clearError: handleClearError
  };
};