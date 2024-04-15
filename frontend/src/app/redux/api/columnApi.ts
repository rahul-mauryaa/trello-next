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

const columnApi = createApi({
  baseQuery: customFetchBase,
  reducerPath: "columnApi",
  keepUnusedDataFor: 30,
  tagTypes: ["getAllColumns", "getcolumns"],
  endpoints: (build) => ({
    // getMe: build.query<Profile | undefined, void>({
    //   query: () => `user/me`,
    //   transformResponse: (res: GenericResponse<Profile>) => res.data,
    //   providesTags: ['me'],
    // }),
    createColumns: build.mutation<any, any>({
      query: (data) => {
        return {
          url: "api/columns",
          body: data,
          method: "POST",
        };
      },
      invalidatesTags: ["getAllColumns"],
    }),
    updateColumns: build.mutation<any, any>({
      query: ({ data, id }) => {
        return {
          url: `api/columns/${id}`,
          body: data,
          method: "PUT",
        };
      },
      invalidatesTags: ["getAllColumns"],
    }),
    deleteColumns: build.mutation({
      query: (id) => {
        return {
          url: `api/columns/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getAllColumns"],
    }),
    getAllColumns: build.query<any, undefined | void>({
      query: (id) => {
        console.log(id, "borferuddddddddd");
        return {
          url: `api/columns/all?boardId=${id}`,
        };
      },
      providesTags: ["getAllColumns"],
    }),
    getColumsById: build.query({
      query: (id) => {
        return {
          url: `api/bords/${id}`,
        };
      },
      providesTags: ["getcolumns"],
    }),
  }),
});

export const {
  useLazyGetAllColumnsQuery,
  useCreateColumnsMutation,
  useDeleteColumnsMutation,
  useUpdateColumnsMutation,
} = columnApi;

export default columnApi;
