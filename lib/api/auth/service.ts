import axiosInstance from "../axios";
import { User, LoginResponse } from "@/lib/types";

export const authService = {
    async login(credentials: any): Promise<LoginResponse> {
        const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
        return response.data;
    },

    async forgetPassword(email: string) {
        const response = await axiosInstance.post("/auth/forget-password", { email });
        return response.data;
    },

    async resetPassword(token: string, newPassword: string) {
        const response = await axiosInstance.post(`/auth/reset/${token}`, { newPassword });
        return response.data;
    },

    async updateUser(userId: string, data: FormData) {
        const response = await axiosInstance.put(`/auth/${userId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        // console.log(response.data)
        return response.data;
    },

    async getUserById(userId: string) {
        const response = await axiosInstance.get(`/auth/${userId}`);
        return response.data;
    }
};
