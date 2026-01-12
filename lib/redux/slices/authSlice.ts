import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "@/lib/types";

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true, // Start as true until hydration completes
    error: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            const { user, token } = action.payload;
            state.user = {
                ...user,
                name: user.userName // Maintain compatibility with existing UI
            };
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;

            if (typeof window !== 'undefined') {
                localStorage.setItem("auth_token", token);
                localStorage.setItem("auth_user", JSON.stringify(state.user));
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_user");
            }
        },
        updateCredentials: (state, action: PayloadAction<{ name?: string; email?: string; image?: string }>) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload,
                    userName: action.payload.name || state.user.userName,
                    name: action.payload.name || state.user.name
                };
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem("auth_user", JSON.stringify(state.user));
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        hydrate: (state) => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem("auth_token");
                const userJson = localStorage.getItem("auth_user");

                if (token && userJson) {
                    try {
                        state.token = token;
                        state.user = JSON.parse(userJson);
                        state.isAuthenticated = true;
                    } catch (e) {
                        console.error("Failed to parse persisted user", e);
                        localStorage.removeItem("auth_token");
                        localStorage.removeItem("auth_user");
                    }
                }
            }
            state.isLoading = false; // Hydration complete
        }

    },
});

export const { setCredentials, logout, updateCredentials, setLoading, setError, hydrate } = authSlice.actions;
export const authReducer = authSlice.reducer;
