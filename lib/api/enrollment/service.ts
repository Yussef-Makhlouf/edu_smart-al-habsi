import axiosInstance from "../axios";
import type { EnrollPayload } from "./types";

export const enrollmentService = {
    enrollInCourse: async (payload: EnrollPayload): Promise<void> => {
        await axiosInstance.post("/enroll", payload);
    },

    getMyEnrollments: async (): Promise<any[]> => {
        const response = await axiosInstance.get("/enroll/my-courses");
        return response.data;
    },
};
