import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

const useAuthToken = () => {
  const [authToken, setAuthToken] = useState(null);
  console.log(
    authToken,
    "authhhhhhhhhhhhhhhhhhhhhhhhhhhhh======================"
  );
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const { accessToken } = JSON.parse(token);
      setAuthToken(accessToken);
    }
  }, []);

  return authToken;
};

export default useAuthToken;
