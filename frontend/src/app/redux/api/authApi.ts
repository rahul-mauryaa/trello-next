import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { setCookie } from "cookies-next";
// import { getApiURL } from '@/utils/checkEnvironment';
// import config from '@/config/default';

// import { GenericResponse } from '@/types/types';
// import { Login, Profile } from '@/types/user.types';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});


const authApi = createApi({
  baseQuery,
  reducerPath: "authApi",
  keepUnusedDataFor: 30,
  tagTypes: ["me"],
  endpoints: (build) => ({
    registeruser: build.mutation<any, any>({
      query: (data) => {
        return {
          url: "api/users/register",
          body: data,
          method: "POST",
        };
      },
    }),
    loginuser: build.mutation<any, any>({
      query: (data) => {
        return {
          url: "api/users/login",
          body: data,
          method: "POST",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled.then((data) => {
            // localStorage.setItem("token", JSON.stringify(data.data));
            setCookie("token", JSON.stringify(data.data));
          });
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
      // invalidatesTags:['me']
    }),
    getMe: build.query<any | undefined, void>({
      query: () => `api/users/current`,
      transformResponse: (res: any) => res,
      providesTags: ["me"],
    }),
  }),
});

export const { useRegisteruserMutation, useGetMeQuery, useLoginuserMutation } =
  authApi;

export default authApi;
