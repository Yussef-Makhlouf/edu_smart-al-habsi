// ==================== BACKEND TYPES ====================

export interface CourseImage {
  secure_url: string;
  public_id: string;
}

export interface Video {
  _id: string;
  title: string;
  courseId: string;
  chapterId?: string;
  bunny?: {
    videoId: string;
    libraryId: string;
  };
  order: number;
  isPreview: boolean;
  status?: string;
  duration?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Chapter {
  _id: string;
  title: string;
  order: number;
  lessons: Video[];
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number | { amount: number; currency: string };
  image?: CourseImage;
  bunnyCollectionId?: string;
  isPublished: boolean;
  chapters: Chapter[];
  category?: string | { _id: string; name: string };
  studentsCount?: number;
  createdAt: string;
  updatedAt?: string;
}

// ==================== DTO TYPES ====================

export interface CreateCourseDTO {
  title: string;
  description: string;
  price?: number; // Keep for compatibility if needed elsewhere
  priceAmount?: number;
  currency?: string;
  categoryId?: string;
  totalDuration?: number;
  whatYouWillLearn?: string[];
  requirements?: string[];
  level?: string;
}

export interface UpdateCourseDTO {
  title?: string;
  description?: string;
  price?: number;
  priceAmount?: number;
  currency?: string;
  isPublished?: boolean;
  image?: string;
  categoryId?: string;
  totalDuration?: number;
  whatYouWillLearn?: string[];
  requirements?: string[];
  level?: string;
}

export interface CreateVideoDTO {
  courseId: string;
  title: string;
  chapterId?: string;
}

// ==================== BUNNY CDN TYPES ====================

export interface BunnyUploadDetails {
  videoLibraryId: number;
  guid: string;
  title: string;
  description: string | null;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number;
  status: number;
  framerate: number;
  rotation: number | null;
  width: number;
  height: number;
  availableResolutions: string | null;
  outputCodecs: string | null;
  thumbnailCount: number;
  encodeProgress: number;
  storageSize: number;
  captions: any[];
  hasMP4Fallback: boolean;
  collectionId: string;
  thumbnailFileName: string;
  thumbnailBlurhash: string | null;
  averageWatchTime: number;
  totalWatchTime: number;
  category: string;
  chapters: any[];
  moments: any[];
  metaTags: any[];
  transcodingMessages: any[];
  jitEncodingEnabled: boolean | null;
  smartGenerateStatus: string | null;
  hasOriginal: boolean;
  originalHash: string | null;
}

export interface AddVideoResponse {
  video: Video;
  bunnyUploadDetails: BunnyUploadDetails;
}

export interface SignedVideoParams {
  token: string;
  expires: number;
  videoId: string;
}

export interface SignedVideoResponse {
  success: boolean;
  signedUrlParams: SignedVideoParams;
}

// ==================== API RESPONSE WRAPPER ====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ==================== LEGACY TYPES (for compatibility) ====================

export interface CreateCoursePayload extends CreateCourseDTO { }
export interface UpdateCoursePayload extends UpdateCourseDTO { }
export interface AddVideoPayload extends CreateVideoDTO { }
export interface VideoSignedUrlResponse extends SignedVideoResponse { }

