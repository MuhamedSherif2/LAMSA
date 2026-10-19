import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

import type {ApiResponse,ApiResponseWithCount,} from "@/types/api.types";
import type {ContactMessage,CreateContactPayload,} from "@/types/contact.types";

export const ContactSlice = createApi({
  reducerPath: "Contact",
  baseQuery,
  tagTypes: ["Contacts"],

  endpoints: (builder) => ({
    // Create contact message
    createMessage: builder.mutation<ApiResponse<ContactMessage>,CreateContactPayload>({
      query: (data) => ({
        url: "contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contacts"]
    }),
    
    // Get all contact messages
    getAllMessages: builder.query<ApiResponseWithCount<ContactMessage[]>,void>({
      query: () => "contact",
      providesTags: ["Contacts"]
    }),
    
    // Get message by ID
    getMessageById: builder.query<ApiResponse<ContactMessage>,string>({
      query: (id) => `contact/${id}`,
      providesTags: ["Contacts"]
    }),
    
    // Mark message as read
    markAsRead: builder.mutation<ApiResponse<ContactMessage>,string>({
      query: (id) => ({
        url: `contact/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Contacts"]
    }),
    
    // Delete contact message
    deleteMessage: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"]
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetAllMessagesQuery,
  useGetMessageByIdQuery,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} = ContactSlice;