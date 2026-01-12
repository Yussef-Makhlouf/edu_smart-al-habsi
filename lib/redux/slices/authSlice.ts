import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "@/lib/types";
import { authAPI } from "@/lib/api/auth/api";
import type { LoginPayload, RegisterPayload } from "@/lib/api/auth/types";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  { user: User; token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const data = await authAPI.login(payload);
    return {
      token: data.token,
      user: data.user as User,
    };
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Network error while logging in"
    );
  }
});

export const registerUser = createAsyncThunk<
  void,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    await authAPI.register(payload);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Network error while registering"
    );
  }
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  { state: RootState; rejectValue: string }
>("auth/logoutUser", async (_payload, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) return;

  try {
    await authAPI.logout(token);
  } catch (error) {
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Network error while logging out"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;


