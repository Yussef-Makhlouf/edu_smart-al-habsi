"use client";

import React, { createContext, useContext, useState } from "react";
import { User, Course, Enrollment, UserRole } from "./types";

// Re-export types for convenience if needed by other components importing from store
export type { User, Course, Enrollment, UserRole };

// Helper function to get sections - using hardcoded data
const getSectionsForCourse = (slug: string) => {
    const sectionsMap: Record<string, { title: string; lessons: { title: string; duration: string }[] }[]> = {
        "e-business-secrets": [
            {
                title: "مقدمة في البزنس الإلكتروني",
                lessons: [
                    { title: "ما هو البزنس الإلكتروني؟", duration: "15:00" },
                    { title: "فرص السوق الرقمي", duration: "20:00" },
                    { title: "بناء خطة العمل", duration: "25:00" },
                ],
            },
            {
                title: "التسويق الرقمي",
                lessons: [
                    { title: "استراتيجيات التسويق الإلكتروني", duration: "22:00" },
                    { title: "التسويق عبر وسائل التواصل", duration: "18:00" },
                    { title: "إعلانات جوجل وفيسبوك", duration: "20:00" },
                ],
            },
            {
                title: "إدارة المشروع",
                lessons: [
                    { title: "إدارة العمليات", duration: "20:00" },
                    { title: "قياس الأداء", duration: "16:00" },
                    { title: "التوسع والنمو", duration: "18:00" },
                ],
            },
        ],
        "crisis-management": [
            {
                title: "مفهوم الأزمة",
                lessons: [
                    { title: "تعريف الأزمة وأنواعها", duration: "18:00" },
                    { title: "علامات الإنذار المبكر", duration: "22:00" },
                ],
            },
            {
                title: "استراتيجيات المواجهة",
                lessons: [
                    { title: "خطة الطوارئ", duration: "25:00" },
                    { title: "التواصل في الأزمات", duration: "20:00" },
                ],
            },
        ],
        "digital-startup": [
            {
                title: "اختيار الفكرة",
                lessons: [
                    { title: "كيف تجد فكرة ناجحة", duration: "20:00" },
                    { title: "دراسة السوق", duration: "25:00" },
                ],
            },
            {
                title: "بناء المنتج",
                lessons: [
                    { title: "MVP - الحد الأدنى", duration: "30:00" },
                    { title: "اختبار السوق", duration: "22:00" },
                ],
            },
            {
                title: "النمو والتوسع",
                lessons: [
                    { title: "استراتيجيات النمو", duration: "28:00" },
                    { title: "جذب الاستثمار", duration: "25:00" },
                ],
            },
        ],
    };
    return sectionsMap[slug] || [];
};

// Mock data - Users
const MOCK_USERS: User[] = [
    { id: "admin-1", name: "Admin User", email: "admin@edusmart.com", role: "admin", password: "123" },
    { id: "student-1", name: "محمد علي", email: "student@edusmart.com", role: "student", password: "123" }
];

// Mock data - Courses (created from coursesData)
const MOCK_COURSES: Course[] = [
    { 
        id: 1, 
        slug: "e-business-secrets", 
        category: "ريادة الأعمال", 
        title: "كورس أسرار عالم البزنس الإلكتروني", 
        description: "خطوة بخطوة نحو بناء مشروعك الالكتروني ناجح.", 
        price: "1200 SAR", 
        priceValue: 1200, 
        image: "/images/Mockup.jpg", 
        instructor: "د. عمار عمر", 
        duration: "12 ساعة", 
        rating: 4.9, 
        students: 2450, 
        longDescription: "دورة شاملة تغطي جميع جوانب البزنس الإلكتروني...", 
        features: ["شهادة معتمدة"], 
        sections: getSectionsForCourse("e-business-secrets")
    },
    { 
        id: 2, 
        slug: "crisis-management", 
        category: "القيادة", 
        title: "فن إدارة الأزمات الكبرى", 
        description: "دورة مكثفة لفهم إدارة الأزمات.", 
        price: "1100 SAR", 
        priceValue: 1100, 
        image: "/images/Mockup.jpg", 
        instructor: "د. محمد الحبسي", 
        duration: "10 ساعات", 
        rating: 4.8, 
        students: 1820, 
        longDescription: "تعلم كيفية التعامل مع الأزمات...", 
        features: ["دراسات حالة"], 
        sections: getSectionsForCourse("crisis-management")
    },
    { 
        id: 3, 
        slug: "digital-startup", 
        category: "ريادة الأعمال", 
        title: "تأسيس المشاريع الرقمية", 
        description: "من الفكرة إلى أول مليون.", 
        price: "950 SAR", 
        priceValue: 950, 
        image: "/images/Mockup.jpg", 
        instructor: "د. سارة أحمد", 
        duration: "15 ساعة", 
        rating: 4.9, 
        students: 3200, 
        longDescription: "من الفكرة إلى أول مليون ريال...", 
        features: ["قوالب خطط عمل"], 
        sections: getSectionsForCourse("digital-startup")
    },
];

// Mock data - Enrollments
const MOCK_ENROLLMENTS: Enrollment[] = [
    { courseId: 1, progress: 35, lastAccessed: "الآن" }, 
    { courseId: 2, progress: 100, lastAccessed: "أمس" }, 
    { courseId: 3, progress: 0, lastAccessed: "قبل أسبوع" } 
];

// --- Context State Interface ---

interface StoreState {
    user: User | null;
    users: User[]; // List of all users for admin
    login: (email: string, role: UserRole) => boolean; // Return success/fail
    logout: () => void;

    courses: Course[];
    enrolledCourses: (Course & { progress: number })[];

    enroll: (courseId: number) => void;
    isEnrolled: (courseId: number) => boolean;

    cartCourse: Course | null;
    addToCart: (course: Course) => void;
    clearCart: () => void;

    // Admin Actions
    addStudent: (user: User) => void;
    addCourse: (course: Course) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

// --- Provider ---

export function StoreProvider({ children }: { children: React.ReactNode }) {
    // Auth State
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);

    // Data State
    const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
    const [enrollments, setEnrollments] = useState<Enrollment[]>(MOCK_ENROLLMENTS);

    // Cart State
    const [cartCourse, setCartCourse] = useState<Course | null>(null);

    // Actions
    const login = (email: string, role: UserRole) => {
        // Simple auth check against 'users' database
        const foundUser = users.find(u => u.email === email && u.role === role);
        if (foundUser) {
            setUser(foundUser);
            return true;
        } else {
            // Fallback for demo if users cleared, just to keep it working
            const demoUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                name: email.split("@")[0],
                email,
                role
            };
            setUser(demoUser);
            return true;
        }
    };

    const logout = () => {
        setUser(null);
    };

    const enroll = (courseId: number) => {
        if (enrollments.some(e => e.courseId === courseId)) return;

        const newEnrollment: Enrollment = {
            courseId,
            progress: 0,
            lastAccessed: "الآن",
        };
        const updatedEnrollments = [...enrollments, newEnrollment];
        setEnrollments(updatedEnrollments);
    };

    const isEnrolled = (courseId: number) => {
        return enrollments.some(e => e.courseId === courseId);
    };

    const addToCart = (course: Course) => {
        setCartCourse(course);
    };

    const clearCart = () => {
        setCartCourse(null);
    };

    // --- Admin Actions ---

    const addStudent = (newUser: User) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
    };

    const addCourse = (newCourse: Course) => {
        const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
    };

    // Derived State
    const enrolledCourseList = enrollments.map(enrollment => {
        const course = courses.find(c => c.id === enrollment.courseId);
        if (!course) return null;
        return { ...course, progress: enrollment.progress };
    }).filter(Boolean) as (Course & { progress: number })[];

    return (
        <StoreContext.Provider value={{
            user,
            users,
            login,
            logout,
            courses,
            enrolledCourses: enrolledCourseList,
            enroll,
            isEnrolled,
            cartCourse,
            addToCart,
            clearCart,
            addStudent,
            addCourse
        }}>
            {children}
        </StoreContext.Provider>
    );
}

// --- Hook ---

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}
