import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { AuthSlice } from "./slices/authSlice";
import { BannerSlice } from "./slices/bannerSlice";
import { CartSlice } from "./slices/cartSlice";
import { CategorySlice } from "./slices/categorySlice";
import { ContactSlice } from "./slices/contactSlice";
import { CouponSlice } from "./slices/couponSlice";
import { FaqSlice } from "./slices/faqSlice";
import { OrderSlice } from "./slices/orderSlice";
import { ProductSlice } from "./slices/productSlice";
import { StoreSlice } from "./slices/storeSlice";
import { SubCategorySlice } from "./slices/subCategorySlice";
import { TestimonialsSlice } from "./slices/testimonialSlice";
import { UserSlice } from "./slices/userSlice";
import { WishlistSlice } from "./slices/wishlistSlice";

export const Store = configureStore({
  reducer: {
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    [BannerSlice.reducerPath]: BannerSlice.reducer,
    [CartSlice.reducerPath]: CartSlice.reducer,
    [CategorySlice.reducerPath]: CategorySlice.reducer,
    [ContactSlice.reducerPath]: ContactSlice.reducer,
    [CouponSlice.reducerPath]: CouponSlice.reducer,
    [FaqSlice.reducerPath]: FaqSlice.reducer,
    [OrderSlice.reducerPath]: OrderSlice.reducer,
    [ProductSlice.reducerPath]: ProductSlice.reducer,
    [StoreSlice.reducerPath]: StoreSlice.reducer,
    [SubCategorySlice.reducerPath]: SubCategorySlice.reducer,
    [TestimonialsSlice.reducerPath]: TestimonialsSlice.reducer,
    [UserSlice.reducerPath]: UserSlice.reducer,
    [WishlistSlice.reducerPath]: WishlistSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthSlice.middleware,
      BannerSlice.middleware,
      CartSlice.middleware,
      CategorySlice.middleware,
      ContactSlice.middleware,
      CouponSlice.middleware,
      FaqSlice.middleware,
      OrderSlice.middleware,
      ProductSlice.middleware,
      StoreSlice.middleware,
      SubCategorySlice.middleware,
      TestimonialsSlice.middleware,
      UserSlice.middleware,
      WishlistSlice.middleware,
    ]),
});

// Export hooks for dispatch and selector
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

// All API slices
export const apiSlices = [
  AuthSlice,
  BannerSlice,
  CartSlice,
  CategorySlice,
  ContactSlice,
  CouponSlice,
  FaqSlice,
  OrderSlice,
  ProductSlice,
  StoreSlice,
  SubCategorySlice,
  TestimonialsSlice,
  UserSlice,
  WishlistSlice,
] as const;

// Reset all API cache
export function resetAllApiState(dispatch: AppDispatch) {
  for (const api of apiSlices) {
    dispatch(api.util.resetApiState());
  }
}

// Typed hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();