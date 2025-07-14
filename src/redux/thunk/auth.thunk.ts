// src/redux/thunks/auth.thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../services/auth.api';
import {
  LoginCredentials,
  RegisterCredentials,
  OtpVerificationPayload,
  PasswordResetPayload,
} from '../../types/authTypes';
import toast from 'react-hot-toast';

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      console.log("API Response:", response.data);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Register thunk
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return response;
    } catch (error: any) {
      toast.error(error?.response?.data?.message ||"Registration failed");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Forgot password thunk
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(email);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Verify OTP thunk
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (data: OtpVerificationPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyOtp(data);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Reset password thunk
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: PasswordResetPayload, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data);
      return response;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Logout thunk
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      return rejectWithValue('Failed to logout');
    }
  }
);
