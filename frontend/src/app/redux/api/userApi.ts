import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
const baseUrl = "http://localhost:5000/";

import { setUsers } from "../slice/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (getCookie("token")) {
      const { accessToken } = JSON.parse(getCookie("token") as string);
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<any, null>({
      query() {
        return {
          url: "api/users/current",
        };
      },
      transformResponse: (result: any) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (error) {}
      },
    }),
  }),
});
