// // src/redux/slices/auth.slice.ts
// import { createSlice } from '@reduxjs/toolkit';

// import {
//   login,
//   register,
//   forgotPassword,
//   verifyOtp,
//   resetPassword,
//   logoutAsync,
// } from '../thunk/auth.thunk';
// import { AuthState } from '@/types/authTypes';
// import { fetchUserProfile, updateUserProfile } from '../thunk/user.thunk';

// // Initial state
// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
// };

// // Create slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     // Synchronous logout (clears state immediately)
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Login
//     builder
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.data;
//         state.token = action.payload.token as any;
//         if (action.payload.token) {
//           localStorage.setItem('token', action.payload.token); // Store manually
//         }
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });

//     // Register
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state) => {
//         state.isLoading = false;
//         // After registration, user typically needs to login separately
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });

//     // Forgot Password
//     builder
//       .addCase(forgotPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(forgotPassword.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(forgotPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });

//     // Verify OTP
//     builder
//       .addCase(verifyOtp.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(verifyOtp.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });

//     // Reset Password
//     builder
//       .addCase(resetPassword.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(resetPassword.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });

//     // Async Logout
//     builder
//       .addCase(logoutAsync.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(logoutAsync.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//         state.isLoading = false;
//         state.error = null;
//       })
//       .addCase(logoutAsync.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//       builder
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         if (state.isAuthenticated) {
//           // Parse the profile data from the response
//           let profileData;
//           if (action.payload?.data) {
//             profileData = action.payload.data;
//           } else {
//             profileData = action.payload;
//           }
          
//           // Update the user in auth state
//           if (profileData) {
//             state.user = profileData;
//           }
//         }
//       });
    
//     // When profile is updated successfully, update auth user state
//     builder
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         if (state.isAuthenticated) {
//           // Parse the profile data from the response
//           let profileData;
//           if (action.payload?.data) {
//             profileData = action.payload.data;
//           } else {
//             profileData = action.payload;
//           }
          
//           // Update the user in auth state
//           if (profileData) {
//             state.user = profileData;
//           }
//         }
//       });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;


// src/redux/slices/auth.slice.ts
import { createSlice } from '@reduxjs/toolkit';

import {
  login,
  register,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logoutAsync,
} from '../thunk/auth.thunk';
import { AuthState } from '@/types/authTypes';
import { fetchUserProfile, updateUserProfile, uploadProfileImage } from '../thunk/user.thunk';

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous logout (clears state immediately)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Add a new reducer to manually update the profile image
    updateProfileImage: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          profile: action.payload
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.token = action.payload.token as any;
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token); // Store manually
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        // After registration, user typically needs to login separately
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verify OTP
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Async Logout
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch user profile
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        if (state.isAuthenticated) {
          // Parse the profile data from the response
          let profileData;
          if (action.payload?.data) {
            profileData = action.payload.data;
          } else {
            profileData = action.payload;
          }
          
          // Update the user in auth state
          if (profileData) {
            state.user = profileData;
          }
        }
      });
    
    // When profile is updated successfully, update auth user state
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.isAuthenticated && state.user) {
          // Parse the profile data from the response
          let profileData;
          if (action.payload?.data) {
            profileData = action.payload.data;
          } else {
            profileData = action.payload;
          }
          
          // Update the user in auth state while preserving existing fields
          if (profileData) {
            // Ensure we're not losing any properties from the existing user
            state.user = {
              ...state.user,
              ...profileData
            };
            
            // Log for debugging purposes
            console.log('Auth slice: Updated user with new profile data', state.user);
          }
        }
      });

    // Handle profile image upload success case to update the auth state
    builder
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.isAuthenticated && state.user && action.payload?.url) {
          // Make sure to update the profile image URL in the auth state
          state.user = {
            ...state.user,
            profile: action.payload.url
          };
          console.log('Auth slice: Updated user profile image', action.payload.url);
        }
      });
  },
});

export const { logout, clearError, updateProfileImage } = authSlice.actions;
export default authSlice.reducer;