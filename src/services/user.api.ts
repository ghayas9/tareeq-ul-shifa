// // src/services/user.api.ts
// import axios from 'axios';
// import { UpdateProfileData, UserResponse } from '../types/userTypes';

// // Create axios instance
// const api = axios.create({
//   baseURL: 'https://tareeq-ul-shifa-server-three.vercel.app/api/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests
// api.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// // Add response debugging
// api.interceptors.response.use(
//   (response) => {
//     console.log('API Response:', response);
//     return response;
//   },
//   (error) => {
//     console.error('API Error:', error.response || error);
//     return Promise.reject(error);
//   }
// );

// export const userApi = {
//   // Get user profile
//   getProfile: async (): Promise<UserResponse> => {
//     try {
//       console.log('Fetching user profile...');
//       const response = await api.get('/user/profile');
//       console.log('User profile response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       throw error;
//     }
//   },

//   // Update user profile
//   updateProfile: async (data: UpdateProfileData): Promise<UserResponse> => {
//     try {
//       console.log('Updating user profile with data:', data);
//       const response = await api.put('/user', data);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//       throw error;
//     }
//   },

//   // Upload profile image
//   uploadImage: async (file: File): Promise<{ url: string }> => {
//     const formData = new FormData();
//     formData.append('file', file);

//     const response = await api.post('/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data;
//   },

//   // Change password
//   changePassword: async (data: { 
//     currentPassword: string; 
//     newPassword: string; 
//     confirmPassword: string 
//   }): Promise<any> => {
//     try {
//       console.log('Changing password...');
//       // Make sure the endpoint matches your backend route
//       const response = await api.post('/auth/change/password', data);
//       return response.data;
//     } catch (error) {
//       console.error('Error changing password:', error);
//       throw error;
//     }
//   },
// };

// src/services/user.api.ts
import { UpdateProfileData, User } from '../types/userTypes';
import { api } from '@/config/constants';


// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export const userApi = {
  // Get user profile
  getProfile: async (): Promise<User> => {
    try {
      console.log('Fetching user profile...');
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    try {
      console.log('Updating user profile with data:', data);
      const response = await api.put('/user', data);

      // Return the data directly since it's not wrapped in a data property
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Upload profile image
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Change password
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string
  }): Promise<any> => {
    try {
      console.log('Changing password...');
      // Make sure the endpoint matches your backend route
      const response = await api.post('/auth/change/password', data);
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },
};