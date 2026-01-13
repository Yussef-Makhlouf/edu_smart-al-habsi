import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { coursesReducer } from "./slices/coursesSlice";
import { enrollmentReducer } from "./slices/enrollmentSlice";
import { coursesApi } from "@/lib/api/courses/coursesApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
        enrollment: enrollmentReducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(coursesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

