// src/types/api.types.ts

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data: T;
}

/** بعض الـ endpoints بترجّع count معاها (زي getAllUsers) */
export interface ApiResponseWithCount<T> extends ApiResponse<T> {
    count?: number;
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]> | string[];
    statusCode?: number;
}

export type ID = string;

export interface ImageAsset {
    url: string;
    publicId?: string;
    alt?: string;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';