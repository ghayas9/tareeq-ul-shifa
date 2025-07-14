import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../services/user.api';
import { UpdateProfileData } from '../../types/userTypes';
import toast from 'react-hot-toast';

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Thunk: Fetching user profile');
      const response = await userApi.getProfile();
      if (response && !response.data) {
        return { data: response };
      }

      return response;
    } catch (error: any) {
      console.log(error)
      // toast.error(error?.message)
      // console.error('Thunk: Error fetching user profile:', error);
      // const errorMessage =
      //   error.response?.data?.message || 'Failed to fetch profile';
      // toast.error(errorMessage);
      // return rejectWithValue(errorMessage);
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: UpdateProfileData, { rejectWithValue }) => {
    try {
      console.log('Thunk: Updating user profile with data:', data);
      const response = await userApi.updateProfile(data);
      console.log('Thunk: User profile updated:', response);

      // If the response is directly the user object (no data property)
      // Wrap it in a format the reducer expects
      if (response && !response.data) {
        return { data: response };
      }

      toast.success('Profile updated successfully');
      return response;
    } catch (error: any) {
      console.error('Thunk: Error updating user profile:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// The rest of your thunks remain the same...
export const uploadProfileImage = createAsyncThunk(
  'user/uploadImage',
  async (file: File, { rejectWithValue }) => {
    try {
      console.log('Thunk: Uploading profile image');
      const response = await userApi.uploadImage(file);
      console.log('Thunk: Profile image uploaded:', response);
      return response;
    } catch (error: any) {
      console.error('Thunk: Error uploading profile image:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to upload image';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (
    data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log('Thunk: Changing password');
      const response = await userApi.changePassword(data);
      console.log('Thunk: Password changed successfully');
      toast.success('Password changed successfully');
      return response;
    } catch (error: any) {
      console.error('Thunk: Error changing password:', error);
      const errorMessage =
        error.response?.data?.message || 'Failed to change password';
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
