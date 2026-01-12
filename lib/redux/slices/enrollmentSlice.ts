import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Course } from "@/lib/types";
import { enrollmentAPI } from "@/lib/api/enrollment/api";

export interface EnrollmentState {
  myCourses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  myCourses: [],
  loading: false,
  error: null,
};

export const enrollInCourse = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: string }
>("enrollment/enrollInCourse", async (courseId, { getState, rejectWithValue }) => {
  const token = getState().auth.token;

  if (!token) {
    return rejectWithValue("User is not authenticated");
  }

  try {
    await enrollmentAPI.enrollInCourse({ courseId }, token);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Network error while enrolling in course"
    );
  }
});

export const fetchMyEnrollments = createAsyncThunk<
  Course[],
  void,
  { state: RootState; rejectValue: string }
>("enrollment/fetchMyEnrollments", async (_payload, { getState, rejectWithValue }) => {
  const token = getState().auth.token;

  if (!token) {
    return rejectWithValue("User is not authenticated");
  }

  try {
    const data = await enrollmentAPI.getMyEnrollments(token);
    return data as Course[];
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Network error while fetching enrollments"
    );
  }
});

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    clearEnrollmentError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMyEnrollments.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.myCourses = action.payload;
        }
      )
      .addCase(fetchMyEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch enrollments";
      })
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to enroll in course";
      });
  },
});

export const { clearEnrollmentError } = enrollmentSlice.actions;
export const enrollmentReducer = enrollmentSlice.reducer;

export const selectEnrollment = (state: RootState) => state.enrollment;


