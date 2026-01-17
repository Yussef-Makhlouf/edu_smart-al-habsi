export interface Category {
    _id: string;
    name: string;
    slug: string;
    createdBy: {
        _id: string;
        userName: string;
        email: string;
    } | string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface CreateCategoryDTO {
    name: string;
}

export interface UpdateCategoryDTO {
    name: string;
}
