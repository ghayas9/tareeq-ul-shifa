// src/types/auth.types.ts

export interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
  }
  
  export interface OtpVerificationPayload {
    email: string;
    otp: string;
  }
  
  export interface PasswordResetPayload {
    resetToken: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    data?: any;
  }