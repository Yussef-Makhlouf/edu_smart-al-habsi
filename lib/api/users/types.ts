import { UserRole } from "@/lib/types";

export interface UserImage {
    secure_url: string;
    public_id: string;
}

export interface Enrollment {
    _id: string;
    userId: string;
    courseId: {
        _id: string;
        title: string;
        price: number | { amount: number; currency: string };
        image: { secure_url: string };
    };
    status: string;
    enrolledAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    _id: string;
    userName: string;
    email: string;
    role: UserRole;
    isBlocked: boolean;
    coursenumbers: boolean;
    createdAt: string;
    updatedAt: string;
    image: UserImage | string;
    customId?: string;
    enrollments?: Enrollment[];
}

export interface GetAllUsersResponse {
    success: true;
    message: string;
    length: number;
    users: User[];
}

export interface GetOneUserResponse {
    success: true;
    message: string;
    user: User;
}

export interface UserStatisticsResponse {
    success: true;
    message: string;
    users: {
        totalStudents: number;
        totalEnrollments: number;
        activeStudents: number;
        instructors?: number;
    };
}

export interface CreateUserDTO {
    userName: string;
    email: string;
    password: string;
    role?: UserRole;
    image?: File;
}

export interface UpdateUserDTO {
    userName?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    isActive?: boolean;
    image?: File | string;
}

export interface BulkDeleteDTO {
    ids: string[];
}
