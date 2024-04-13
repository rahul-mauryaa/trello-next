// middleware.ts
"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../components/hooks";
import { logout } from "../redux/slice/authSlice";

const useHandleToken = () => {
  const router = useRouter();
  const token = getCookie("token");
  const dispatch = useAppDispatch();

  const handleExpire = () => {
    let expireTime;

    try {
      if (token) {
        const { expiresIn } = JSON.parse(token as string);
        expireTime = expiresIn;
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }

    const currentTime = Date.now();

    if (token && expireTime <= currentTime) {
      dispatch(logout());
      deleteCookie("token");
      router.push("/login"); // Redirect to login page
    }
  };

  return {
    handleExpire,
  };
};

export default useHandleToken;
