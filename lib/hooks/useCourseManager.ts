import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import {
    useGetCoursesQuery,
    useGetCourseQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useAddVideoMutation,
    useDeleteVideoMutation,
    useLazyGetSignedVideoUrlQuery,
} from "@/lib/api/courses/coursesApi";
import {
    setIsUploadingVideo,
    setUploadProgress,
    resetUploadState,
} from "@/lib/redux/slices/coursesSlice";
import type {
    Course,
    Video,
    CreateCourseDTO,
    UpdateCourseDTO,
    BunnyUploadDetails,
} from "@/lib/api/courses/types";

interface UseCourseManagerReturn {
    // Data
    course: Course | undefined;
    courses: Course[] | undefined;
    videos: Video[];
    isLoadingCourses: boolean;

    // Mutations
    createCourse: (data: CreateCourseDTO, image?: File) => Promise<Course | undefined>;
    updateCourse: (data: UpdateCourseDTO, image?: File) => Promise<Course | undefined>;
    deleteCourse: (targetCourseId?: string) => Promise<void>;
    addVideo: (title: string, chapterId?: string) => Promise<{ video: Video; bunnyUploadDetails: BunnyUploadDetails } | undefined>;
    deleteVideo: (videoId: string) => Promise<void>;
    getSignedVideoUrl: (videoId: string) => Promise<string | undefined>;
    uploadToBunny: (file: File, bunnyDetails: BunnyUploadDetails) => Promise<void>;

    // States
    isLoading: boolean;
    isSaving: boolean;
    isUploading: boolean;
    uploadProgress: number;
    error: string | null;
}

export function useCourseManager(courseId?: string): UseCourseManagerReturn {
    const dispatch = useDispatch();

    // RTK Query hooks
    const {
        data: allCourses,
        isLoading: isLoadingCourses,
    } = useGetCoursesQuery();

    const {
        data: responseData,
        isLoading,
        error: queryError,
    } = useGetCourseQuery(courseId!, { skip: !courseId });

    const [createCourseMutation, { isLoading: isCreating }] = useCreateCourseMutation();
    const [updateCourseMutation, { isLoading: isUpdating }] = useUpdateCourseMutation();
    const [deleteCourseMutation, { isLoading: isDeleting }] = useDeleteCourseMutation();
    const [addVideoMutation, { isLoading: isAddingVideo }] = useAddVideoMutation();
    const [deleteVideoMutation, { isLoading: isDeletingVideo }] = useDeleteVideoMutation();
    const [getSignedUrlTrigger] = useLazyGetSignedVideoUrlQuery();

    const course = responseData?.course;

    // Extract videos from the direct videos array sent by backend
    // Fallback to chapters if the direct array is empty
    const videos: Video[] = responseData?.videos && responseData.videos.length > 0
        ? responseData.videos
        : (course?.chapters?.flatMap(chapter => chapter.videos) || []);

    const isSaving = isCreating || isUpdating || isDeleting || isAddingVideo || isDeletingVideo;

    // Create course
    const createCourse = useCallback(async (data: CreateCourseDTO, image?: File): Promise<Course | undefined> => {
        try {
            let body: FormData | CreateCourseDTO;

            const priceValue = typeof data.price === "object" ? (data.price as any).amount : data.price;

            if (image instanceof File) {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("description", data.description);
                formData.append("price", priceValue.toString());
                formData.append("priceValue", priceValue.toString()); // Fallback for some backend versions
                formData.append("image", image);
                body = formData;
            } else {
                body = {
                    ...data,
                    price: priceValue,
                    // @ts-ignore - priceValue might be expected by backend
                    priceValue: priceValue
                };
            }

            const result = await createCourseMutation(body).unwrap();
            toast.success("✨ تم إنشاء الدورة بنجاح");
            return result;
        } catch (error: any) {
            console.error("Create course error:", error);
            const message = error?.data?.message || error?.message || "❌ فشل إنشاء الدورة";
            toast.error(message);
            return undefined;
        }
    }, [createCourseMutation]);

    // Update course
    const updateCourse = useCallback(async (data: UpdateCourseDTO, image?: File): Promise<Course | undefined> => {
        if (!courseId) {
            toast.error("⚠️ لا يوجد معرف للدورة");
            return undefined;
        }

        try {
            let body: FormData | UpdateCourseDTO;
            const priceValue = data.price !== undefined
                ? (typeof data.price === "object" && data.price !== null ? (data.price as any).amount : data.price)
                : undefined;

            if (image instanceof File) {
                const formData = new FormData();
                // Add all fields from data to formData
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        // If value is a price object, extract amount
                        const finalValue = (key === "price" && typeof value === "object" && value !== null)
                            ? (value as any).amount
                            : value;
                        formData.append(key, finalValue.toString());
                    }
                });

                if (priceValue !== undefined) {
                    formData.append("priceValue", priceValue.toString());
                }

                formData.append("image", image);
                body = formData;

                // Debug: Log FormData content
                console.log(`🚀 Updating course ${courseId} via FormData`);
                for (let [key, val] of (formData as any).entries()) {
                    console.log(`📦 Field [${key}]:`, val instanceof File ? `File Object: ${val.name}` : val);
                }
            } else {
                body = {
                    ...data,
                    price: priceValue,
                    // @ts-ignore
                    priceValue: priceValue,
                    image: course?.image?.secure_url
                } as UpdateCourseDTO;
                console.log(`🚀 Updating course ${courseId} via JSON (with existing image):`, body);
            }

            const result = await updateCourseMutation({ id: courseId, data: body }).unwrap();
            toast.success("✅ تم تحديث بيانات الدورة بنجاح");
            return result;
        } catch (error: any) {
            console.error("Update course FULL error object:", error);
            if (error.data) console.error("Update course error data:", error.data);

            const message = error?.data?.message || error?.message || (typeof error === 'string' ? error : "❌ فشل تحديث الدورة");
            toast.error(message);
            return undefined;
        }
    }, [courseId, updateCourseMutation]);

    // Delete course
    const deleteCourse = useCallback(async (targetCourseId?: string): Promise<void> => {
        const idToDelete = targetCourseId || courseId;
        if (!idToDelete) {
            toast.error("⚠️ لا يوجد معرف للدورة");
            return;
        }

        try {
            await deleteCourseMutation(idToDelete).unwrap();
            toast.success("🗑️ تم حذف الدورة بنجاح");
        } catch (error: any) {
            console.error("Delete course error:", error);
            const message = error?.data?.message || error?.message || "❌ فشل حذف الدورة";
            toast.error(message);
        }
    }, [courseId, deleteCourseMutation]);

    // Add video
    const addVideo = useCallback(async (title: string, chapterId?: string) => {
        if (!courseId) {
            toast.error("⚠️ لا يوجد معرف للدورة");
            return undefined;
        }

        // Fix: Ensure we always send a chapterId to avoid backend "undefined length" crash
        const targetChapterId = chapterId || course?.chapters?.[0]?._id;

        if (!targetChapterId) {
            console.error("❌ No chapter found for this course:", course);
            toast.error("⚠️ يجب أن تحتوي الدورة على قسم واحد على الأقل لإضافة دروس");
            return undefined;
        }

        try {
            const payload = {
                courseId,
                title,
                chapterId: targetChapterId,
                // Redundant/Alternative field names for compatibility
                course_id: courseId,
                chapter_id: targetChapterId,
                video: {
                    title,
                    courseId,
                    chapterId: targetChapterId
                }
            };

            console.log("🎬 Adding video with robust params:", payload);
            const result = await addVideoMutation(payload).unwrap();

            console.log("✅ Add video API response:", result);
            // ... (rest of the validation remains the same)

            // Validate the response structure
            if (!result || !result.video || !result.bunnyUploadDetails) {
                console.error("Invalid API response structure:", result);
                toast.error("❌ استجابة غير صحيحة من الخادم");
                return undefined;
            }

            // Validate bunnyUploadDetails has required fields
            if (!result.bunnyUploadDetails.guid || !result.bunnyUploadDetails.videoLibraryId) {
                console.error("Missing required bunnyUploadDetails fields:", result.bunnyUploadDetails);
                toast.error("⚠️ بيانات Bunny CDN غير مكتملة");
                return undefined;
            }

            return result;
        } catch (error: any) {
            console.error("Add video error:", error);
            const message = error?.data?.message || error?.message || "❌ فشل إضافة الدرس";
            toast.error(message);
            return undefined;
        }
    }, [courseId, addVideoMutation, course]);

    // Delete video
    const deleteVideo = useCallback(async (videoId: string): Promise<void> => {
        if (!videoId) {
            toast.error("⚠️ معرف الفيديو غير موجود");
            return;
        }

        try {
            await deleteVideoMutation(videoId).unwrap();
            toast.success("🗑️ تم حذف الدرس بنجاح");
        } catch (error: any) {
            console.error("❌ Delete video error:", error);

            const serverMessage = error?.data?.message;
            let message = "❌ فشل حذف الدرس";

            if (serverMessage?.includes("BunnyDelete Error")) {
                message = "⚠️ فشل حذف الفيديو من Bunny CDN (قد يكون الفيديو محذوفاً بالفعل)";
            } else if (serverMessage) {
                message = serverMessage;
            } else if (error?.message) {
                message = error.message;
            }

            toast.error(message);
        }
    }, [deleteVideoMutation]);

    // Get signed video URL
    const getSignedVideoUrl = useCallback(async (videoId: string): Promise<string | undefined> => {
        if (!videoId) {
            toast.error("⚠️ معرف الفيديو غير موجود");
            return undefined;
        }

        try {
            const params = await getSignedUrlTrigger(videoId).unwrap();
            console.log("🎬 Received Signed Params:", params);

            if (!params) {
                throw new Error("لم يتم استلام بيانات من السيرفر");
            }

            // Case 1: Standard Bunny CDN params (token, expires, videoId)
            if (params.token && params.expires && params.videoId) {
                const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
                if (!libraryId) {
                    console.error("NEXT_PUBLIC_BUNNY_LIBRARY_ID is missing");
                    toast.error("⚠️ إعدادات المشغل غير مكتملة (Library ID missing)");
                    return undefined;
                }
                return `https://iframe.mediadelivery.net/embed/${libraryId}/${params.videoId}?token=${params.token}&expires=${params.expires}`;
            }

            // Case 2: Direct URL from backend
            if (params.signedUrl || params.url) {
                return params.signedUrl || params.url;
            }

            // Case 3: If params itself is a string (rare but possible)
            if (typeof params === 'string' && params.startsWith('http')) {
                return params;
            }

            console.error("⚠️ Incomplete signedUrlParams:", params);
            toast.error("⚠️ بيانات تشغيل الفيديو غير مكتملة");
            return undefined;
        } catch (error: any) {
            console.error("❌ Get signed URL error:", error);
            const message = error?.data?.message || error?.message || "❌ فشل الحصول على رابط الفيديو";
            toast.error(message);
            return undefined;
        }
    }, [getSignedUrlTrigger]);

    // Upload to Bunny CDN
    const uploadToBunny = useCallback(async (file: File, bunnyDetails: BunnyUploadDetails): Promise<void> => {
        try {
            // Validate bunnyDetails
            if (!bunnyDetails || !bunnyDetails.guid || !bunnyDetails.videoLibraryId) {
                console.error("Invalid bunnyDetails:", bunnyDetails);
                toast.error("⚠️ بيانات الرفع غير صحيحة");
                return;
            }

            // Build the upload URL for Bunny CDN
            const uploadUrl = `https://video.bunnycdn.com/library/${bunnyDetails.videoLibraryId}/videos/${bunnyDetails.guid}`;

            // Get API key from environment variable
            const apiKey = process.env.NEXT_PUBLIC_BUNNY_API_KEY;

            if (!apiKey) {
                console.error("NEXT_PUBLIC_BUNNY_API_KEY is not set in environment variables");
                return;
            }

            console.log("Uploading to Bunny CDN:", {
                uploadUrl,
                videoLibraryId: bunnyDetails.videoLibraryId,
                guid: bunnyDetails.guid,
                fileSize: file.size,
                fileName: file.name,
            });

            dispatch(setIsUploadingVideo(true));
            dispatch(setUploadProgress(0));

            await axios.put(uploadUrl, file, {
                headers: {
                    "AccessKey": apiKey,
                    "Content-Type": "application/octet-stream",
                },
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total
                        ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    dispatch(setUploadProgress(progress));
                },
            });

            toast.success("🎉 تم رفع الفيديو ومعالجته بنجاح!");
            dispatch(resetUploadState());
        } catch (error: any) {
            console.error("Upload failed:", error);
            const message = error?.response?.data?.message || error?.message || "❌ فشل رفع الفيديو لـ Bunny CDN";
            toast.error(message);
            dispatch(resetUploadState());
            throw error;
        }
    }, [dispatch]);

    return {
        // Data
        course,
        courses: allCourses,
        videos,

        // Mutations
        createCourse,
        updateCourse,
        deleteCourse,
        addVideo,
        deleteVideo,
        getSignedVideoUrl,
        uploadToBunny,

        // States
        isLoading,
        isLoadingCourses,
        isSaving,
        isUploading: false, // This will be managed by Redux state
        uploadProgress: 0,  // This will be managed by Redux state
        error: queryError ? String(queryError) : null,
    };
}
