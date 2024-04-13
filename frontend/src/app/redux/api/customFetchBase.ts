import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { getCookie } from "cookies-next";
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
  console.log(result.error?.data, "resultData");
  //   if ((result.error?.data as any)?.code === "token_not_valid") {
  //     if (!mutex.isLocked()) {
  //       const release = await mutex.acquire();

  //       let token;

  //       if (localStorage.getItem("token")) {
  //         const { refresh } = JSON.parse(localStorage.getItem("token") as string);

  //         token = refresh;
  //       }

  //       try {
  //         const refreshResult = await baseQuery(
  //           {
  //             url: "api/token/refresh",
  //             method: "POST",
  //             body: {
  //               refresh: token,
  //             },
  //           },
  //           api,
  //           extraOptions
  //         );

  //         if (refreshResult.data) {
  //           // Retry the initial query

  //           // reinitialize tokens
  //           localStorage.setItem(
  //             "token",
  //             JSON.stringify({
  //               access: (refreshResult.data as unknown as any)?.access,
  //               refresh: (refreshResult.data as unknown as any)?.refresh,
  //             })
  //           );

  //           result = await baseQuery(args, api, extraOptions);
  //         } else {
  //           api.dispatch(logout());
  //           window.location.href = "/";
  //         }
  //       } finally {
  //         // release must be called once the mutex should be released again.
  //         release();
  //       }
  //     } else {
  //       // wait until the mutex is available without locking it
  //       await mutex.waitForUnlock();
  //       result = await baseQuery(args, api, extraOptions);
  //     }
  //   }
  return result;
};

export default customFetchBase;
