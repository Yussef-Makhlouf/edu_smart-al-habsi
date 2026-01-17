/**
 * Centralized Base Query Configuration for RTK Query
 * 
 * This file provides a single source of truth for:
 * - API base URL
 * - Authorization header injection
 * - 401/Session expiry handling
 * 
 * All RTK Query APIs (coursesApi, enrollmentApi, usersApi) use this.
 * No duplication of auth logic across multiple files.
 */

import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/authSlice";

/**
 * Single definition of API base URL
 * Trailing slashes are removed for consistency
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:8080/api/v1";

/**
 * Base query with automatic auth header injection
 * Token is retrieved from Redux state or localStorage
 */
const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token || localStorage.getItem("auth_token");

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

/**
 * Base query with reauth logic
 * Handles 401 errors and session expiry by logging out and redirecting to login
 * 
 * @returns Modified base query that handles authentication errors
 */
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQueryWithAuth(args, api, extraOptions);

    if (result.error) {
        const message = (result.error.data as any)?.message;

        // Check for authentication failures
        if (
            result.error.status === 401 ||
            message === "Authentication required. Please log in." ||
            message === "Session expired. This account is logged in from another device."
        ) {
            // Dispatch logout action to clear Redux state
            api.dispatch(logout());

            // Redirect to login page
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
    }

    return result;
};
