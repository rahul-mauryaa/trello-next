import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { deleteCookie, getCookie } from "cookies-next";
import { logout } from "../slice/authSlice";
//   import { logout } from "@/redux/features/authSlice";
// import config from "@/config/default";

// const baseUrl = config.API_ENDPOINT;
const baseUrl = "http://localhost:5000/";
// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    if (getCookie("token")) {
      const { accessToken } = JSON.parse(getCookie("token") as string);
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if ((result.error?.data as any)?.message === "User is not authorized") {
    api.dispatch(logout());
    deleteCookie("token");
    window.location.href = "/";
  }
  return result;
};

export default customFetchBase;
