import { API_BASE_URL, getAuthHeaders, handleResponse } from "../config";
import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  UserResponse,
  UpdateUserResponse,
  ForgetPasswordResponse,
} from "./types";

// ==================== AUTH API ====================

export const authAPI = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<LoginResponse>(response);
  },

  register: async (payload: RegisterPayload): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleResponse<void>(response);
  },

  logout: async (token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ token }),
    });
    return handleResponse<void>(response);
  },

  getAllUsers: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  getUserById: async (id: string, token: string): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/${id}`, {
      headers: getAuthHeaders(token),
    });
    return handleResponse<UserResponse>(response);
  },

  addUser: async (payload: FormData, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type for FormData, browser will set it with boundary
      },
      body: payload,
    });
    return handleResponse(response);
  },

  updateUser: async (id: string, payload: FormData, token: string): Promise<UpdateUserResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });
    return handleResponse<UpdateUserResponse>(response);
  },

  deleteUser: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });
    return handleResponse(response);
  },

  forgetPassword: async (email: string): Promise<ForgetPasswordResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/forget-password`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email }),
      }
    );
    return handleResponse<ForgetPasswordResponse>(response);
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/reset/${token}`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ newPassword }),
    });
    return handleResponse(response);
  },

  changePassword: async (email: string, newPassword: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/change_password`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ email, newPassword }),
      }
    );
    return handleResponse(response);
  },

  deleteMultipleUsers: async (ids: string[], token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/multy`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ ids }),
    });
    return handleResponse(response);
  },
};

