import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

import type { ApiResponse, ApiResponseWithCount, } from "@/types/api.types";
import type { Banner, BannerFormData, } from "@/types/banner.types";

export const BannerSlice = createApi({
  reducerPath: "Banner",
  baseQuery,
  tagTypes: ["Banner"],

  endpoints: (builder) => ({
    // GET: Get all banners
    getAllBanners: builder.query<ApiResponseWithCount<Banner[]>, void>({
      query: () => ({
        url: "banner",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),

    // POST: Create banner
    createBanner: builder.mutation<ApiResponse<Banner>, BannerFormData>({
      query: ({ title, link, image }) => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("link", link);

        if (image) {
          formData.append("image", image);
        }

        return {
          url: "banner",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Banner"],
    }),

    // PUT: Update banner
    updateBanner: builder.mutation<ApiResponse<Banner>, { id: string; data: Partial<BannerFormData> }>({
      query: ({ id, data }) => {
        const formData = new FormData();

        if (data.title !== undefined) {
          formData.append("title", data.title);
        }

        if (data.link !== undefined) {
          formData.append("link", data.link);
        }

        if (data.image) {
          formData.append("image", data.image);
        }

        return {
          url: `banner/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Banner"],
    }),

    // DELETE: Delete banner
    deleteBanner: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = BannerSlice;