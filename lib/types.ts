export type UserRole = "Admin" | "Student" | "Instructor";

export interface User {
    _id: string;
    userName: string;
    email: string;
    role: UserRole;
    image?: string | { secure_url: string };
    currentSessionToken?: string;
    // Compatibility fields
    name?: string;
}

export interface LoginResponse {
    message: string;
    userUpdated: {
        user: User;
        token: string;
    };
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}


export interface Course {
    id: number;
    slug: string;
    category: string;
    title: string;
    description: string;
    price: string;
    priceValue: number; // Numeric value for calculations
    image: string;
    instructor: string;
    duration?: string;
    rating?: number;
    students?: number;
    longDescription?: string;
    sections?: {
        title: string;
        lessons: { title: string; duration: string }[];
    }[];
    features?: string[];
}

export interface Enrollment {
    courseId: number;
    progress: number;
    lastAccessed: string;
}
