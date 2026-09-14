// src/types/auth.types.ts

export interface Register {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }
  
  export interface Login {
    email: string;
    password: string;
  }
  
  export interface VerifyEmail {
    email: string;
    otp: string;
  }
  
  export interface ForgotPassword {
    email: string;
  }
  
  export interface ResetPassword {
    password: string;
  }
  
  export interface AuthUser {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: 'user' | 'admin';
  }
  
  export interface LoginResponse {
    token: string;
    user: AuthUser;
  }