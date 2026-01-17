import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery";
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from "./types";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/categories",
            transformResponse: (response: any) => response.categories || response.data || response,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: "Category" as const, id: _id })),
                        { type: "Category", id: "LIST" },
                    ]
                    : [{ type: "Category", id: "LIST" }],
        }),
        getCategory: builder.query<Category, string>({
            query: (id) => `/categories/${id}`,
            transformResponse: (response: any) => response.category || response.data || response,
            providesTags: (result, error, id) => [{ type: "Category", id }],
        }),
        createCategory: builder.mutation<Category, CreateCategoryDTO>({
            query: (data) => ({
                url: "/categories",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [{ type: "Category", id: "LIST" }],
        }),
        updateCategory: builder.mutation<Category, { id: string; data: UpdateCategoryDTO }>({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Category", id },
                { type: "Category", id: "LIST" },
            ],
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Category", id: "LIST" }],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
