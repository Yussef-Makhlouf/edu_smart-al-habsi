"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Course, Enrollment, UserRole } from "./types";
import { INITIAL_COURSES, INITIAL_USERS, INITIAL_ENROLLMENTS } from "./mock-data";

// Re-export types for convenience if needed by other components importing from store
export type { User, Course, Enrollment, UserRole };

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
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);

    // Data State
    const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
    const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS);

    // Cart State
    const [cartCourse, setCartCourse] = useState<Course | null>(null);

    // Hydrate from LocalStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("edu_smart_user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const storedUsers = localStorage.getItem("edu_smart_users_db");
        if (storedUsers) setUsers(JSON.parse(storedUsers));

        const storedCourses = localStorage.getItem("edu_smart_courses_db");
        if (storedCourses) setCourses(JSON.parse(storedCourses));

        const storedEnrollments = localStorage.getItem("edu_smart_enrollments");
        if (storedEnrollments) setEnrollments(JSON.parse(storedEnrollments));
    }, []);

    // Actions
    const login = (email: string, role: UserRole) => {
        // Simple auth check against 'users' database
        const foundUser = users.find(u => u.email === email && u.role === role);
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("edu_smart_user", JSON.stringify(foundUser));
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
            localStorage.setItem("edu_smart_user", JSON.stringify(demoUser));
            return true;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("edu_smart_user");
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
        localStorage.setItem("edu_smart_enrollments", JSON.stringify(updatedEnrollments));
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
        localStorage.setItem("edu_smart_users_db", JSON.stringify(updatedUsers));
    };

    const addCourse = (newCourse: Course) => {
        const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
        localStorage.setItem("edu_smart_courses_db", JSON.stringify(updatedCourses));
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
