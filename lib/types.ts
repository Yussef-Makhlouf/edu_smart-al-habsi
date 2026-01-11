export type UserRole = "admin" | "student";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    password?: string; // For mock auth validation
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
