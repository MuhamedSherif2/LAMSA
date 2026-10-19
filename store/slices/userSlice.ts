import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { User, UpdatedUser, UpdateProfilePayload, UpdatePasswordPayload, } from "@/types/user.types";

export const UserSlice = createApi({
  reducerPath: "User",
  baseQuery,
  tagTypes: ["Users"],
  
  endpoints: (builder) => ({
    // ---------- User ----------
    
    // Get profile
    getProfile: builder.query<ApiResponse<User>, void>({
      query: () => "users/profile",
      providesTags: ["Users"]
    }),
    
    // Update profile
    updateProfile: builder.mutation<ApiResponse<UpdatedUser>,UpdateProfilePayload>({
      query: (data) => ({
        url: "users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"]
    }),
    
    // Update password
    updatePassword: builder.mutation<ApiResponse<null>, UpdatePasswordPayload>({
      query: (data) => ({
        url: "users/password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"]
    }),
    
    // ---------- Admin ----------
    
    // Get all users
    getAllUsers: builder.query< ApiResponseWithCount<User[]>,void>({
      query: () => "users",
      providesTags: ["Users"]
    }),
    
    // Get user by ID
    getUserById: builder.query<ApiResponse<User>, string>({
      query: (id) => `users/${id}`,
      providesTags: ["Users"]
    }),
    
    // Delete user
    deleteUser: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"]
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = UserSlice;