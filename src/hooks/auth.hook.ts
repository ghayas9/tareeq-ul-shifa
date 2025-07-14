// src/hooks/auth.hooks.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  login,
  register,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logoutAsync,
} from '../redux/thunk/auth.thunk';
import { logout as logoutSync, clearError } from '../redux/slices/authSlice';
import {
  LoginCredentials,
  RegisterCredentials,
  OtpVerificationPayload,
  PasswordResetPayload,
} from '../types/authTypes';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: any) => state.auth);

  const handleLogin = async (credentials: LoginCredentials) => {
    return await dispatch(login(credentials)).unwrap();
  };

  const handleRegister = async (userData: RegisterCredentials) => {
    return await dispatch(register(userData)).unwrap();
  };

  const handleForgotPassword = async (email: string) => {
    return await dispatch(forgotPassword(email)).unwrap();
  };

  const handleVerifyOtp = async (data: OtpVerificationPayload) => {
    return await dispatch(verifyOtp(data)).unwrap();
  };

  const handleResetPassword = async (data: PasswordResetPayload) => {
    return await dispatch(resetPassword(data)).unwrap();
  };

  const handleLogout = async () => {
    // First, make the API call to handle server-side logout
    await dispatch(logoutAsync());
    // Then, clear the local state
    dispatch(logoutSync());
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
    ...auth,
    login: handleLogin,
    register: handleRegister,
    forgotPassword: handleForgotPassword,
    verifyOtp: handleVerifyOtp,
    resetPassword: handleResetPassword,
    logout: handleLogout,
    clearError: handleClearError,
  };
};
