import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "../baseQuery";

import type { ApiResponse } from "@/types/api.types";

import type { Register, Login, VerifyEmail, ForgotPassword, ResetPassword, LoginResponse } from "@/types/auth.types";

export const AuthSlice = createApi({
    reducerPath: "Auth",
    baseQuery,
    tagTypes: ["Auth"],

    endpoints: (builder) => ({
        register: builder.mutation<ApiResponse, Register>({
            query: (data) => ({
                url: "auth/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"]
        }),
        
        login: builder.mutation<ApiResponse<LoginResponse>, Login>({
            query: (data) => ({
                url: "auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"]
        }),
        
        verifyEmail: builder.mutation<ApiResponse, VerifyEmail>({
            query: (data) => ({
                url: "auth/verify-email",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"]
        }),
        
        forgotPassword: builder.mutation<ApiResponse, ForgotPassword>({
            query: (data) => ({
                url: "auth/forgotPassword",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"]
        }),
        
        resetPassword: builder.mutation<ApiResponse, { token: string; data: ResetPassword }>({
            query: ({ token, data }) => ({
                url: `auth/resetPassword/${token}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"]
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = AuthSlice;