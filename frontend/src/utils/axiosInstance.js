import axios from "axios";
import { logout } from "./auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// RESPONSE INTERCEPTOR TO HANDLE ERRORS GLOBALLY SPECIALLY ON TOKEN EXPIRY
// IF EXPIRE AUTOMATIC LOGOUT
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
