import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { deleteCookie, getCookie } from "cookies-next";
import { logout } from "../slice/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,

  // ✅ IMPORTANT (Fix CORS + cookies)
  credentials: "include",

  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");

    const token = getCookie("token");
    if (token) {
      const { accessToken } = JSON.parse(token as string);
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers; // ✅ MUST return headers
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  const result = await baseQuery(args, api, extraOptions);

  if ((result.error?.data as any)?.message === "User is not authorized") {
    api.dispatch(logout());
    deleteCookie("token");
    window.location.href = "/";
  }
  return result;
};

export default customFetchBase;
