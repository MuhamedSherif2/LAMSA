// src/types/user.types.ts

export type UserRole = 'user' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatedUser {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
}

export interface UpdateProfilePayload {
  name?: string;
  phoneNumber?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}