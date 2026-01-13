import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CoursesState {
    selectedCourseId: string | null;
    selectedVideoId: string | null;
    isUploadingVideo: boolean;
    uploadProgress: number;
}

const initialState: CoursesState = {
    selectedCourseId: null,
    selectedVideoId: null,
    isUploadingVideo: false,
    uploadProgress: 0,
};

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setSelectedCourseId: (state, action: PayloadAction<string | null>) => {
            state.selectedCourseId = action.payload;
        },
        setSelectedVideoId: (state, action: PayloadAction<string | null>) => {
            state.selectedVideoId = action.payload;
        },
        setIsUploadingVideo: (state, action: PayloadAction<boolean>) => {
            state.isUploadingVideo = action.payload;
        },
        setUploadProgress: (state, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },
        resetUploadState: (state) => {
            state.isUploadingVideo = false;
            state.uploadProgress = 0;
        },
    },
});

export const {
    setSelectedCourseId,
    setSelectedVideoId,
    setIsUploadingVideo,
    setUploadProgress,
    resetUploadState,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;

