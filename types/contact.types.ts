// src/types/contact.types.ts

export interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateContactPayload {
    name: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
  }