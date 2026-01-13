import axios from "axios";
import { toast } from "sonner";
import { store } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/authSlice";
import { translateError } from "@/lib/utils/error-translator";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token || localStorage.getItem("auth_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const rawMessage = error.response?.data?.message || error.message;
        const message = translateError(rawMessage);

        if (
            rawMessage === "Session expired. This account is logged in from another device." ||
            rawMessage === "Authentication required. Please log in." ||
            error.response?.status === 401
        ) {
            store.dispatch(logout());

            if (rawMessage === "Session expired. This account is logged in from another device.") {
                toast.error("تم تسجيل الدخول من جهاز آخر", {
                    description: "يرجى تسجيل الدخول مرة أخرى للمتابعة.",
                });
            }

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }

        // Return a modified error object with translated message
        if (error.response?.data) {
            error.response.data.message = message;
        } else {
            error.message = message;
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
