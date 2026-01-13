import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/authSlice";
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

const baseQuery = fetchBaseQuery({
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

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        const message = (result.error.data as any)?.message;
        if (
            result.error.status === 401 ||
            message === "Authentication required. Please log in." ||
            message === "Session expired. This account is logged in from another device."
        ) {
            api.dispatch(logout());
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
    }

    return result;
};

export const coursesApi = createApi({
    reducerPath: "coursesApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Course", "Video"],
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
                const course = response.course || response.data;
                const rawVideos = response.videos || [];

                // Normalize videos to ensure they have _id
                const videos = rawVideos.map((v: any) => ({
                    ...v,
                    _id: v._id || v.id
                }));

                return { course, videos };
            },
            providesTags: (result, error, id) => [{ type: "Course", id }],
        }),

        // Create course
        createCourse: builder.mutation<Course, FormData>({
            query: (formData) => ({
                url: "/courses/create",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: any) => {
                // Backend returns { success, message, course }
                if (response.course) return response.course;
                if (response.data) return response.data;
                return response;
            },
            invalidatesTags: [{ type: "Course", id: "LIST" }],
        }),

        // Update course
        updateCourse: builder.mutation<Course, { id: string; data: UpdateCourseDTO }>({
            query: ({ id, data }) => ({
                url: `/courses/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: any) => {
                // Backend may return { success, message, course } or { data: course }
                if (response.course) return response.course;
                if (response.data) return response.data;
                return response;
            },
            invalidatesTags: (result, error, { id }) => [{ type: "Course", id }],
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
            ],
        }),

        // Add video to course
        addVideo: builder.mutation<AddVideoResponse, CreateVideoDTO>({
            query: (data) => ({
                url: "/courses/video/add",
                method: "POST",
                body: data,
            }),
            transformResponse: (response: any) => {
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
            invalidatesTags: [{ type: "Course" }],
        }),

        // Get signed video URL for playback
        getSignedVideoUrl: builder.query<any, string>({
            query: (videoId) => `/courses/video/${videoId}/sign`,
            transformResponse: (response: any) => {
                // Backend returns { success, signedUrlParams: { token, expires, videoId } }
                if (response.signedUrlParams) return response.signedUrlParams;
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
} = coursesApi;
