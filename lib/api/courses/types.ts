// ==================== COURSES TYPES ====================

export interface CreateCoursePayload {
  title: string;
  description: string;
  price: number;
}

export interface UpdateCoursePayload {
  title?: string;
  description?: string;
  price?: number;
}

export interface AddVideoPayload {
  courseId: string;
  title: string;
}

export interface VideoSignedUrlResponse {
  signedUrl: string;
}

