import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4002",
});

const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    addOrder: builder.mutation({
      query: (user) => {
        const item = localStorage.getItem("token");
        //console.log(item);
        return {
          url: "/order/add-order",
          method: "POST",
          headers: {
            Authorization: `Bearer ${item}`,
          },
          body: user,
        };
      },
    }),
    getOrder: builder.mutation({
      query: (data) => {
        const item = localStorage.getItem("token");
        return {
          url: "/order/get-order",
          method: "GET",
          headers: {
            Authorization: `Bearer ${item}`,
          },
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useGetOrderMutation,
  useAddOrderMutation,
} = apiSlice;

export default apiSlice;
