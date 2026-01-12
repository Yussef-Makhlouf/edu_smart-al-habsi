import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Course } from "@/lib/types";
import { coursesAPI } from "@/lib/api/courses/api";

export interface CoursesState {
  list: Course[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  list: [],
  currentCourse: null,
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk<
  Course[],
  void,
  { state: RootState; rejectValue: string }
>("courses/fetchCourses", async (_payload, { getState, rejectWithValue }) => {
  const token = getState().auth.token;

  try {
    const data = await coursesAPI.getAllCourses(token);
    return data as Course[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Network error while fetching courses"
    );
  }
});

export const fetchCourseById = createAsyncThunk<
  Course,
  string,
  { state: RootState; rejectValue: string }
>("courses/fetchCourseById", async (courseId, { getState, rejectWithValue }) => {
  const token = getState().auth.token;

  try {
    const data = await coursesAPI.getCourse(courseId, token);
    return data as Course;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Network error while fetching course"
    );
  }
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCoursesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch courses";
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourseById.fulfilled,
        (state, action: PayloadAction<Course>) => {
          state.loading = false;
          state.currentCourse = action.payload;
        }
      )
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch course";
      });
  },
});

export const { clearCoursesError } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;

export const selectCourses = (state: RootState) => state.courses;


