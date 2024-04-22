import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
import customFetchBase from "./customFetchBase";

// import { getApiURL } from '@/utils/checkEnvironment';
// import config from '@/config/default';

// import { GenericResponse } from '@/types/types';
// import { Login, Profile } from '@/types/user.types';

const baseUrl = "http://localhost:5000/";

// const baseQuery = fetchBaseQuery({
//   baseUrl,
//   prepareHeaders: (headers, { getState }) => {
//     const tokenObject = JSON.parse(getCookie("token") as string); // Parse the token object from localStorage
//     const accessToken = tokenObject?.accessToken; // Access the accessToken property from the token object
//     // Set the authorization header with the access token
//     headers.set("Authorization", `Bearer ${accessToken}`);
//     return headers;
//   },
// });

const cardApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: "cardApi",
  keepUnusedDataFor: 30,
  tagTypes: ["getAllCards", "getcards"],
  endpoints: (build) => ({
    createCards: build.mutation<any, any>({
      query: (data) => {
        return {
          url: "api/cards",
          body: data,
          method: "POST",
        };
      },
      invalidatesTags: ["getAllCards"],
    }),
    updateCards: build.mutation<any, any>({
      query: ({ data, id }) => {
        return {
          url: `api/cards/${id}`,
          body: data,
          method: "PUT",
        };
      },
      invalidatesTags: ["getAllCards"],
    }),
    deleteCards: build.mutation({
      query: (id) => {
        return {
          url: `api/cards/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllCards"],
    }),
    getAllCards: build.query<any, undefined | void>({
      query: () => {
        return {
          url: `api/cards/all`,
        };
      },
      providesTags: ["getAllCards"],
    }),
    getCardsById: build.query({
      query: (id) => {
        return {
          url: `api/cards/${id}`,
        };
      },
      providesTags: ["getcards"],
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useCreateCardsMutation,
  useDeleteCardsMutation,
  useUpdateCardsMutation,
} = cardApi;

export default cardApi;
