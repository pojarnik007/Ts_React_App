import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse } from "./types";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
