import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";
import {
    GetAllUsersResponse,
    GetOneUserResponse,
    UserStatisticsResponse,
    User,
    BulkDeleteDTO,
    CreateUserDTO,
    UpdateUserDTO
} from "./types";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Users", "User"],
    endpoints: (builder) => ({
        // 1. Get All Users
        getAllUsers: builder.query<GetAllUsersResponse, void>({
            query: () => "/auth/admin/users",
            providesTags: ["Users"],
        }),

        // 2. Get One User
        getUserById: builder.query<GetOneUserResponse, string>({
            query: (id) => `/auth/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id }],
        }),

        // 3. User Statistics
        getUserStatistics: builder.query<UserStatisticsResponse, void>({
            query: () => "/auth/admin/users/statistics",
            providesTags: ["Users"],
        }),

        // 4. Add User
        addUser: builder.mutation<User, FormData>({
            query: (formData) => ({
                url: "/auth/add",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Users"],
        }),

        // 5. Update User
        updateUser: builder.mutation<User, { id: string; data: FormData | UpdateUserDTO }>({
            query: ({ id, data }) => ({
                url: `/auth/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ["Users", { type: "User", id }],
        }),

        // 6. Delete User
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/auth/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),

        // 7. Bulk Delete Users
        bulkDeleteUsers: builder.mutation<void, BulkDeleteDTO>({
            query: (data) => ({
                url: "/auth/multy",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useGetUserStatisticsQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useBulkDeleteUsersMutation,
} = usersApi;
