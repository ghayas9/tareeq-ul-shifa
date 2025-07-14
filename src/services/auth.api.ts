// src/services/auth.api.ts
import { 
  LoginCredentials, 
  RegisterCredentials, 
  OtpVerificationPayload, 
  PasswordResetPayload,
  AuthResponse
} from '../types/authTypes';
import { api } from '@/config/constants';


export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    console.log(response,"response")
    return response.data;
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/forgot', { email });
    return response.data;
  },

  verifyOtp: async (data: OtpVerificationPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/verify/otp', data);
    return response.data;
  },

  resetPassword: async (data: PasswordResetPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/reset/password', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
};