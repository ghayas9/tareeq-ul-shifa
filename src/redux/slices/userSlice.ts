import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types/userTypes';
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfileImage,
  changePassword,
} from '../thunk/user.thunk';

// Initial state
const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Clear any errors
    clearUserError: (state) => {
      state.error = null;
    },
    // Reset user profile
    resetUserProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          if (action.payload.data) {
            state.profile = action.payload.data;
          } else {
            state.profile = action.payload as any;
          }
        } else {
          state.profile = null;
        }

        console.log('User profile set in state:', state.profile);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;

        // Handle both response structures
        if (action.payload) {
          if (action.payload.data) {
            // Handle response wrapped in data property
            state.profile = action.payload.data;
          } else {
            // Handle direct response
            state.profile = action.payload as any;
          }
        }

        console.log('Updated user profile in state:', state.profile);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Upload profile image - this doesn't directly update the state
    // since we'll typically use the URL from this response in the updateUserProfile action
    builder
      .addCase(uploadProfileImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.isLoading = false;
        
        // If we have a response with a URL, update the profile image in state
        if (action.payload?.url && state.profile) {
          state.profile = {
            ...state.profile,
            profile: action.payload.url
          };
        }
      })
      .addCase(uploadProfileImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Change password
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserError, resetUserProfile } = userSlice.actions;
export default userSlice.reducer;
