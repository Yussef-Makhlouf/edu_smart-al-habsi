import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";
import type {
    Course,
    Video,
    CreateCourseDTO,
    UpdateCourseDTO,
    CreateVideoDTO,
    AddVideoResponse,
    SignedVideoResponse,
    ApiResponse,
} from "./types";

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Course", "Video", "Enrollment", "Users"],
    endpoints: (builder) => ({
        // Get all courses
        getCourses: builder.query<Course[], void>({
            query: () => "/courses/all/courses",
            transformResponse: (response: any) => {
                if (response.courses) return response.courses;
                if (response.data) return response.data;
                return response;
            },
            providesTags: (result) =>
                result
                    ? [...result.map(({ _id }) => ({ type: "Course" as const, id: _id })), { type: "Course", id: "LIST" }]
                    : [{ type: "Course", id: "LIST" }],
        }),

        // Get single course with its videos
        getCourse: builder.query<{ course: Course; videos: Video[] }, string>({
            query: (id) => `/courses/${id}`,
            transformResponse: (response: any) => {
                // console.log("🔍 Raw Server Response (getCourse):", response);

                // Try to find course in various common response structures
                const course = response.course || response.data || (response._id ? response : null);

                // Try to find videos in response, embedded in course, or in chapters' lessons
                let rawVideos = response.videos || (course && course.videos) || [];

                if (rawVideos.length === 0 && course?.chapters) {
                    rawVideos = course.chapters.flatMap((chapter: any) => chapter.lessons || []);
                }

                // Normalize videos to ensure they have _id and correct fields
                const videos = rawVideos.map((v: any) => ({
                    ...v,
                    _id: v._id || v.id,
                }));

                // console.log("📦 Parsed Course:", course);
                // console.log("🎥 Parsed Videos:", videos);

                return { course, videos };
            },
            providesTags: (result, error, id) => [{ type: "Course", id }],
        }),

        // Public: Get all courses for users (Landing Page)
        getPublicCourses: builder.query<Course[], void>({
            query: () => "/courses/for/users/",
            transformResponse: (response: any) => {
                const courses = response.courses || response.data || response;
                // console.log("courses", courses);
                return Array.isArray(courses) ? courses : [];
            },
            providesTags: (result) =>
                result
                    ? [...result.map(({ _id }) => ({ type: "Course" as const, id: _id })), { type: "Course", id: "LIST" }]
                    : [{ type: "Course", id: "LIST" }],
        }),

        // Public: Get single course details for users (Landing Page)
        getPublicCourse: builder.query<{ course: Course; videos: Video[] }, string>({
            query: (id) => `/courses/for/users/${id}`,
            transformResponse: (response: any) => {
                const course = response.course || response.data || (response._id ? response : null);
                let rawVideos = response.videos || (course && course.videos) || [];

                if (rawVideos.length === 0 && course?.chapters) {
                    rawVideos = course.chapters.flatMap((chapter: any) => chapter.lessons || []);
                }

                const videos = rawVideos.map((v: any) => ({
                    ...v,
                    _id: v._id || v.id,
                }));

                return { course, videos };
            },
            providesTags: (result, error, id) => [{ type: "Course", id }],
        }),

        // Create course
        createCourse: builder.mutation<Course, FormData | CreateCourseDTO>({
            query: (formData) => ({
                url: "/courses/create",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: any) => {
                const result = response.course || response.data || response;
                return result;
            },
            invalidatesTags: [{ type: "Course", id: "LIST" }, "Enrollment", "Users"],
        }),

        // Update course
        updateCourse: builder.mutation<Course, { id: string; data: UpdateCourseDTO | FormData }>({
            query: ({ id, data }) => ({
                url: `/courses/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any) => {
                // console.log("🚀 Server Response (Update):", response);
                const result = response.course || response.data || response;
                return result;
            },
            invalidatesTags: (result, error, { id }) => [
                { type: "Course", id },
                { type: "Course", id: "LIST" },
                "Enrollment",
                "Users"
            ],
        }),

        // Delete course
        deleteCourse: builder.mutation<void, string>({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Course", id },
                { type: "Course", id: "LIST" },
                "Enrollment",
                "Users"
            ],
        }),

        // Add video to course
        addVideo: builder.mutation<AddVideoResponse, any>({
            query: (data) => ({
                url: "/courses/video/add",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => {
                // console.log("🚀 Server Response (Add Video):", response);
                // Backend may return wrapped response
                let video = response.video || response.data;
                const bunnyUploadDetails = response.bunnyUploadDetails;

                if (video) {
                    video = { ...video, _id: video._id || video.id };
                }

                if (video && bunnyUploadDetails) return { video, bunnyUploadDetails };
                return video || response;
            },
            invalidatesTags: (result, error, { courseId }) => [
                { type: "Course", id: courseId },
                { type: "Video", id: "LIST" },
            ],
        }),

        // Delete video
        deleteVideo: builder.mutation<void, string>({
            query: (videoId) => ({
                url: `/courses/video/${videoId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error) => [
                { type: "Course" as const },
                { type: "Video" as const, id: "LIST" }
            ],
        }),

        // Get signed video URL for playback
        getSignedVideoUrl: builder.query<any, string>({
            query: (videoId) => `/courses/video/${videoId}/sign`,
            transformResponse: (response: any) => {
                // console.log("🔑 Signed URL Response:", response);
                // The backend has inconsistent response structures
                if (response?.signedUrlParams) return response.signedUrlParams;
                if (response?.data?.signedUrlParams) return response.data.signedUrlParams;
                if (response?.data && typeof response.data === 'object') {
                    // Check if the data object itself has the required fields
                    const d = response.data;
                    if (d.token || d.signedUrl || d.url) return d;
                }
                return response;
            },
            providesTags: (result, error, videoId) => [{ type: "Video", id: videoId }],
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useGetCourseQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useAddVideoMutation,
    useDeleteVideoMutation,
    useGetSignedVideoUrlQuery,
    useLazyGetSignedVideoUrlQuery,
    useGetPublicCoursesQuery,
    useGetPublicCourseQuery,
} = coursesApi;
