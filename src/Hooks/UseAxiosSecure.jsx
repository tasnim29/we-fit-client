import axios from "axios";
import { useEffect } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useContext } from "react";

const axiosInstance = axios.create({
  baseURL: "https://we-fit-server.vercel.app",
});

const UseAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext);

  useEffect(() => {
    // Request interceptor: Attach JWT from localStorage
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: Handle unauthorized/forbidden
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          signOutUser()
            .then(() => {
              console.log("Token invalid or expired. User signed out.");
            })
            .catch(console.error);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser]);

  return axiosInstance;
};

export default UseAxiosSecure;
