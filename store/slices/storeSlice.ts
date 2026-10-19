import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import type { ApiResponse } from "@/types/api.types";
import type {Store,CreateStorePayload,UpdateStorePayload,} from "@/types/store.types";

export const StoreSlice = createApi({
  reducerPath: "Store",
  baseQuery,
  tagTypes: ["Stores"],

  endpoints: (builder) => ({
    // Get store settings
    getStoreSettings: builder.query<ApiResponse<Store>, void>({
      query: () => "store",
      providesTags: ["Stores"]
    }),

    // Add store settings
    addStoreSettings: builder.mutation<ApiResponse<Store>,CreateStorePayload>({
      query: (data) => ({
        url: "store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Stores"]
    }),

    // Update store settings
    updateStoreSettings: builder.mutation<ApiResponse<Store>,UpdateStorePayload>({
      query: (data) => ({
        url: "store",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Stores"]
    }),
  }),
});

export const {
  useGetStoreSettingsQuery,
  useAddStoreSettingsMutation,
  useUpdateStoreSettingsMutation,
} = StoreSlice;