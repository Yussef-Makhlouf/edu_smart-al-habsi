import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";
import type { Course } from "../courses/types";
import type { Enrollment } from "./types";

export const enrollmentApi = createApi({
    reducerPath: "enrollmentApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Enrollment", "Users", "Course"],
    endpoints: (builder) => ({
        getMyCourses: builder.query<Course[], void>({
            query: () => "/enroll/my-courses",
            transformResponse: (response: any) => {
                // console.log("🔍 Raw Enrollment Response:", response);
                // Extract array from common backend response structures
                const data = response.enrollments || response.enrolledCourses || response.courses || response.data || response;
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["Enrollment"],
        }),

        // Enroll a user in a course (with bill image)
        enrollUser: builder.mutation<void, FormData | { courseId: string; userId: string; billImage?: File | string }>({
            query: (body) => ({
                url: "/enroll",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Enrollment", "Users", "Course"],
        }),

        // Admin: Get all pending enrollments
        getPendingEnrollments: builder.query<Enrollment[], void>({
            query: () => "/enroll/pending",
            transformResponse: (response: any) => {
                const data = response.enrollments || response.data || response;
                return Array.isArray(data) ? data : [];
            },
            providesTags: ["Enrollment"],
        }),

        // Admin: Approve enrollment
        approveEnrollment: builder.mutation<void, string>({
            query: (id) => ({
                url: `/enroll/${id}/approve`,
                method: "PATCH",
            }),
            invalidatesTags: ["Enrollment", "Users", "Course"],
        }),

        // Admin: Reject enrollment
        rejectEnrollment: builder.mutation<void, string>({
            query: (id) => ({
                url: `/enroll/${id}/reject`,
                method: "PATCH",
            }),
            invalidatesTags: ["Enrollment", "Users", "Course"],
        }),
        // Admin: Manual enrollment
        adminEnrollUser: builder.mutation<void, { courseId: string; userId: string }>({
            query: (body) => ({
                url: "enroll/admin/enroll/user",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Enrollment", "Users", "Course"],
        }),
    }),
});

export const {
    useGetMyCoursesQuery,
    useEnrollUserMutation,
    useAdminEnrollUserMutation,
    useGetPendingEnrollmentsQuery,
    useApproveEnrollmentMutation,
    useRejectEnrollmentMutation
} = enrollmentApi;
