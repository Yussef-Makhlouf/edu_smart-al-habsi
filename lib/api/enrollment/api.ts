import { API_BASE_URL, getAuthHeaders, handleResponse } from "../config";
import type { EnrollPayload } from "./types";

// ==================== ENROLLMENT API ====================

export const enrollmentAPI = {
  enrollInCourse: async (
    payload: EnrollPayload,
    token: string
  ): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/enroll`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(payload),
    });
    return handleResponse<void>(response);
  },

  getMyEnrollments: async (token: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/enroll/my-courses`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse<any[]>(response);
  },
};

