// // src/types/userTypes.ts

// export interface User {
//   id: string;
//   displayName: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   email: string;
//   emailVerified: boolean;
//   status: "pending" | "inactive" | "active";
//   role: "admin" | "user";
//   profile: string | null;
//   createdAt?: string;
//   profileImage?: string;
//   updatedAt?: string;
// }

// export interface UserState {
//   profile: User | null;
//   isLoading: boolean;
//   error: string | null;
// }

// export interface UpdateProfileData {
//   firstName?: string;
//   lastName?: string;
//   displayName?: string;
//   profile?: string;
//   profileImage?: string;

// }

// export interface UserResponse {
//   success?: boolean;
//   message?: string;
//   data?: User;
// }
// src/types/userTypes.ts

export interface User {
  data: any;
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  displayName?: string;
  role?: string;
  status?: string;
  emailVerified?: boolean;
  profile?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  displayName: string;
  profile?: string;
}

// This is only used when your API wraps the data in a response object
export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UserState {
  profile: User | null;
  isLoading: boolean;
  error: string | null;
}