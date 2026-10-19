// baseQuery.ts
import { cookieHelper, TOKEN_KEY } from "@/lib/cookies";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  // prepareHeaders: (headers, { arg }) => {
  //   const token = getCookie("lamsa_token");
  //   // const language = (typeof document !== "undefined" && document.documentElement.lang) ||"en";
  //   const { url } = arg as { url: string };

  //   if (token && !url.split("/").includes("rest")) {
  //     headers.set("Authorization", `Bearer ${token}`);
  //   }

  //   headers.set("Accept", "application/json");
  //   // headers.set("Accept-Language", language as string);
  //   // headers.set("apikey", process.env.NEXT_PUBLIC_API_KEY as string);

  //   return headers;
  // },

  prepareHeaders: (headers, { arg }) => {
    const token = cookieHelper.get(TOKEN_KEY);

    const url =
      typeof arg === "string" ? arg
        : typeof arg === "object" && arg !== null && "url" in arg
          ? arg.url
          : "";

    if (token && !url.split("/").includes("rest")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export default baseQuery;