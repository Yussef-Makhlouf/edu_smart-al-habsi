import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, Enrollment } from "@/lib/types";

interface EnrollmentState {
    enrollments: Enrollment[];
    cartCourse: Course | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: EnrollmentState = {
    enrollments: [],
    cartCourse: null,
    isLoading: false,
    error: null,
};


const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState,
    reducers: {
        setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
            state.enrollments = action.payload;
        },
        enrollInCourse: (state, action: PayloadAction<number>) => {
            if (!state.enrollments.some(e => e.courseId === action.payload)) {
                state.enrollments.push({
                    courseId: action.payload,
                    progress: 0,
                    lastAccessed: "الآن",
                });
            }
        },
        setCartCourse: (state, action: PayloadAction<Course | null>) => {
            state.cartCourse = action.payload;
        },
        clearCart: (state) => {
            state.cartCourse = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { setEnrollments, enrollInCourse, setCartCourse, clearCart, setLoading, setError } = enrollmentSlice.actions;

export const enrollmentReducer = enrollmentSlice.reducer;
