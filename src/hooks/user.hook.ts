
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfileImage,
  changePassword as changePasswordThunk
} from '../redux/thunk/user.thunk';
import { clearUserError } from '../redux/slices/userSlice';
import { UpdateProfileData } from '../types/userTypes';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.user);
  
  // Get user profile
  const getUserProfile = useCallback(async () => {
    try {
      console.log('useUser hook: Fetching user profile');
      const result = await dispatch(fetchUserProfile()).unwrap();
      console.log('useUser hook: Profile fetch result:', result);
      return result;
    } catch (error) {
      console.error('useUser hook: Error fetching profile:', error);
      throw error;
    }
  }, [dispatch]);
  
  // Update user profile
  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    try {
      console.log('useUser hook: Updating profile with data:', data);
      const result = await dispatch(updateUserProfile(data)).unwrap();
      console.log('useUser hook: Profile update result:', result);
      return result;
    } catch (error) {
      console.error('useUser hook: Error updating profile:', error);
      throw error;
    }
  }, [dispatch]);
  
  // Upload profile image
  const uploadImage = useCallback(async (file: File) => {
    try {
      const result = await dispatch(uploadProfileImage(file)).unwrap();
      return result;
    } catch (error) {
      console.error('useUser hook: Error uploading image:', error);
      throw error;
    }
  }, [dispatch]);
  
  // Change password
  const changePassword = useCallback(async (data: { 
    currentPassword: string; 
    newPassword: string; 
    confirmPassword: string 
  }) => {
    try {
      const result = await dispatch(changePasswordThunk(data)).unwrap();
      return result;
    } catch (error) {
      console.error('useUser hook: Error changing password:', error);
      throw error;
    }
  }, [dispatch]);
  
  // Clear errors
  const clearError = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);
  
  return {
    profile,
    isLoading,
    error,
    getUserProfile,
    updateProfile,
    uploadImage,
    changePassword,
    clearError
  };
};