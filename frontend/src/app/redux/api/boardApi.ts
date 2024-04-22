import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
import customFetchBase from "./customFetchBase";

// import { getApiURL } from '@/utils/checkEnvironment';
// import config from '@/config/default';

// import { GenericResponse } from '@/types/types';
// import { Login, Profile } from '@/types/user.types';

const baseUrl = process.env.backendUrl;

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

const boardApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: "boardApi",
  keepUnusedDataFor: 30,
  tagTypes: ["getAllBords", "getboard"],
  endpoints: (build) => ({
    // getMe: build.query<Profile | undefined, void>({
    //   query: () => `user/me`,
    //   transformResponse: (res: GenericResponse<Profile>) => res.data,
    //   providesTags: ['me'],
    // }),
    createBoard: build.mutation<any, any>({
      query: (data) => {
        return {
          url: "api/bords",
          body: data,
          method: "POST",
        };
      },
      invalidatesTags: ["getAllBords"],
    }),
    updateBoard: build.mutation<any, any>({
      query: ({ data, id }) => {
        return {
          url: `api/bords/${id}`,
          body: data,
          method: "PUT",
        };
      },
      invalidatesTags: ["getboard"],
    }),
    deleteBoard: build.mutation({
      query: (id) => {
        return {
          url: `api/bords/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllBords"],
    }),
    getBoard: build.query<any, any>({
      query: (user_id) => {
        return {
          url: `api/bords/?user_id=${user_id}`,
        };
      },
      providesTags: ["getAllBords"],
    }),
    getBoardById: build.query({
      query: (id) => {
        return {
          url: `api/bords/${id}`,
        };
      },
      providesTags: ["getboard"],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useLazyGetBoardQuery,
  useLazyGetBoardByIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;

export default boardApi;
