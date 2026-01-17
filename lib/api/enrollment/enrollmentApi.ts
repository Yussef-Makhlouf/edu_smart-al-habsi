import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";
import type { Course } from "../courses/types";

export const enrollmentApi = createApi({
    reducerPath: "enrollmentApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Enrollment", "Users"],
    endpoints: (builder) => ({
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

        // Enroll a user in a course
        enrollUser: builder.mutation<void, { courseId: string; userId?: string }>({
            query: (body) => ({
                url: "/enroll",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Enrollment", "Users"],
        }),
    }),
});

export const { useGetMyCoursesQuery, useEnrollUserMutation } = enrollmentApi;
