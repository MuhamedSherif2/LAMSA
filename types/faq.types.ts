// src/types/faq.types.ts

export interface FAQ {
    _id: string;
    question: string;
    answer: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateFAQPayload {
    question: string;
    answer: string;
  }
  
  export interface UpdateFAQPayload {
    question?: string;
    answer?: string;
  }