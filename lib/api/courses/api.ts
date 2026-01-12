import { API_BASE_URL, getAuthHeaders, handleResponse } from "../config";
import type {
  CreateCoursePayload,
  UpdateCoursePayload,
  AddVideoPayload,
  VideoSignedUrlResponse,
} from "./types";

// ==================== COURSES API ====================

export const coursesAPI = {
  createCourse: async (
    payload: CreateCoursePayload,
    token: string
  ): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/courses/create`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  getCourse: async (id: string, token?: string | null): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/courses/${id}`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  getAllCourses: async (token?: string | null): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/courses`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse<any[]>(response);
  },

  updateCourse: async (
    id: string,
    payload: UpdateCoursePayload,
    token: string
  ): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/courses/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  deleteCourse: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/courses/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });
    return handleResponse<void>(response);
  },

  addVideo: async (
    payload: AddVideoPayload,
    token: string
  ): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/courses/video/add`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  deleteVideo: async (videoId: string, token: string): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/courses/video/${videoId}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(token),
      }
    );
    return handleResponse<void>(response);
  },

  getVideoSignedUrl: async (
    videoId: string,
    token: string
  ): Promise<VideoSignedUrlResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/courses/video/${videoId}/sign`,
      {
        headers: getAuthHeaders(token),
      }
    );
    return handleResponse<VideoSignedUrlResponse>(response);
  },
};

