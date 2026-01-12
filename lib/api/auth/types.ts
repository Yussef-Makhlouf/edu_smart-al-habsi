// ==================== AUTH TYPES ====================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

export interface LoginResponse {
  message: string;
  userUpdated: {
    user: {
      _id: string;
      userName: string;
      email: string;
      role: string; // "Admin" or "User" from API
      password?: string;
      currentSessionToken?: string;
      resetVerifyToken?: string | null;
      isBlocked?: boolean;
      createdAt?: string;
      updatedAt?: string;
      __v?: number;
      image?: string | {
        secure_url?: string;
        public_id?: string;
      };
    };
    token: string;
  };
}

// User response from GET /api/v1/auth/{id}
export interface UserResponse {
  success: boolean;
  message: string;
  user: {
    _id: string;
    userName: string;
    email: string;
    password?: string;
    role: string;
    currentSessionToken?: string;
    resetVerifyToken?: string | null;
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    image?: string | {
      secure_url?: string;
      public_id?: string;
    };
  };
}

// Update user response from PUT /api/v1/auth/{id}
export interface UpdateUserResponse {
  message: string;
  user: {
    _id: string;
    userName: string;
    email: string;
    password?: string;
    role: string;
    currentSessionToken?: string;
    resetVerifyToken?: string | null;
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    image?: string | {
      secure_url?: string;
      public_id?: string;
    };
  };
}

// Forget Password Response
export interface ForgetPasswordResponse {
  message: string;
  userupdete: {
    _id: string;
    userName: string;
    email: string;
    role: string;
    resetVerifyToken?: string | null;
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}
