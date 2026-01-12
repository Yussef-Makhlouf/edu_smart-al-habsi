import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { coursesReducer } from "./slices/coursesSlice";
import { enrollmentReducer } from "./slices/enrollmentSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: coursesReducer,
        enrollment: enrollmentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
