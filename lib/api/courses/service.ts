import axiosInstance from "../axios";
import type {
    CreateCoursePayload,
    UpdateCoursePayload,
    AddVideoPayload,
    VideoSignedUrlResponse,
} from "./types";

export const coursesService = {
    createCourse: async (payload: CreateCoursePayload): Promise<any> => {
        const response = await axiosInstance.post("/courses/create", payload);
        return response.data;
    },

    getCourse: async (id: string): Promise<any> => {
        const response = await axiosInstance.get(`/courses/${id}`);
        return response.data;
    },

    getAllCourses: async (): Promise<any[]> => {
        const response = await axiosInstance.get("/courses");
        return response.data;
    },

    updateCourse: async (id: string, payload: UpdateCoursePayload): Promise<any> => {
        const response = await axiosInstance.put(`/courses/${id}`, payload);
        return response.data;
    },

    deleteCourse: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/courses/${id}`);
    },

    addVideo: async (payload: AddVideoPayload): Promise<any> => {
        const response = await axiosInstance.post("/courses/video/add", payload);
        return response.data;
    },

    deleteVideo: async (videoId: string): Promise<void> => {
        await axiosInstance.delete(`/courses/video/${videoId}`);
    },

    getVideoSignedUrl: async (videoId: string): Promise<VideoSignedUrlResponse> => {
        const response = await axiosInstance.get(`/courses/video/${videoId}/sign`);
        return response.data;
    },
};
