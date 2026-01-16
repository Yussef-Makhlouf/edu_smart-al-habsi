import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { coursesReducer } from "./slices/coursesSlice";
import { enrollmentReducer } from "./slices/enrollmentSlice";
import { coursesApi } from "@/lib/api/courses/coursesApi";
import { enrollmentApi } from "@/lib/api/enrollment/enrollmentApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
        enrollment: enrollmentReducer,
        [coursesApi.reducerPath]: coursesApi.reducer,
        [enrollmentApi.reducerPath]: enrollmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(coursesApi.middleware, enrollmentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

