import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/redux/store";
import type { Course } from "../courses/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "") || "http://localhost:8080/api/v1";

export const enrollmentApi = createApi({
    reducerPath: "enrollmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token || localStorage.getItem("auth_token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Enrollment"],
    endpoints: (builder) => ({
        // Get all courses the user is enrolled in
        getMyCourses: builder.query<Course[], void>({
            query: () => "/enroll/my-courses",
            transformResponse: (response: any) => {
                console.log("🔍 Raw Enrollment Response:", response);
                // Extract array from common backend response structures
                const data = response.enrollments || response.enrolledCourses || response.courses || response.data || response;
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["Enrollment"],
        }),
    }),
});

export const { useGetMyCoursesQuery } = enrollmentApi;
