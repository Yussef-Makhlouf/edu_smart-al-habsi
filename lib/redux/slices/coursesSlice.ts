import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "@/lib/types";

interface CoursesState {
    items: Course[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CoursesState = {
    items: [],
    isLoading: false,
    error: null,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.items = action.payload;
        },
        setCoursesLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setCoursesError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addCourse: (state, action: PayloadAction<Course>) => {
            state.items.push(action.payload);
        },
    },
});

export const { setCourses, setCoursesLoading, setCoursesError, addCourse } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
