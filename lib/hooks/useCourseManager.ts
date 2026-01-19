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
        : (course?.chapters?.flatMap(chapter => chapter.lessons) || []);

    const isSaving = isCreating || isUpdating || isDeleting || isAddingVideo || isDeletingVideo;

    // Create course
    const createCourse = useCallback(async (data: CreateCourseDTO, image?: File): Promise<Course | undefined> => {
        try {
            let body: FormData | CreateCourseDTO;

            if (image instanceof File) {
                const formData = new FormData();

                // Add all fields from data to formData
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        // Backend often expects values to be JSON stringified in FormData to preserve types
                        // or to be parsed consistently. If the backend is throwing "is not valid JSON",
                        // it's likely because it tries to JSON.parse() every field.
                        if (typeof value === 'object' || Array.isArray(value)) {
                            formData.append(key, JSON.stringify(value));
                        } else {
                            // Even simple strings might need to be stringified if the backend expects JSON.parse()
                            // But usually, we send them as strings. Let's send them as strings but handle price specifically.
                            formData.append(key, value.toString());
                        }
                    }
                });

                // Ensure priceValue is sent in a format the backend expects
                const priceVal = data.priceAmount || data.price;
                if (priceVal !== undefined) {
                    formData.append("priceValue", priceVal.toString());
                    formData.append("price", priceVal.toString());
                }

                formData.append("image", image);
                body = formData;
            } else {
                // When sending JSON, the backend still seems to expect some fields to be stringified JSON strings
                // because it likely calls JSON.parse() on them.
                const jsonBody = { ...data } as any;

                Object.entries(jsonBody).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        if (Array.isArray(value) || (typeof value === 'object' && key !== 'price' && key !== 'image' && key !== 'category')) {
                            jsonBody[key] = JSON.stringify(value);
                        }
                    }
                });

                // Ensure priceValue is there if needed
                jsonBody.priceValue = data.priceAmount || data.price;

                body = jsonBody;
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
                        if (Array.isArray(value) || (typeof value === 'object' && key !== 'price' && key !== 'image')) {
                            formData.append(key, JSON.stringify(value));
                        } else {
                            formData.append(key, value.toString());
                        }
                    }
                });

                const priceVal = data.priceAmount || data.price;
                if (priceVal !== undefined) {
                    formData.append("priceValue", priceVal.toString());
                }

                formData.append("image", image);
                body = formData;
            } else {
                // When sending JSON, the backend still seems to expect some fields to be stringified JSON strings
                // because it likely calls JSON.parse() on them.
                const jsonBody = { ...data } as any;

                Object.entries(jsonBody).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        if (Array.isArray(value) || (typeof value === 'object' && key !== 'price' && key !== 'image' && key !== 'category')) {
                            jsonBody[key] = JSON.stringify(value);
                        }
                    }
                });

                // Use priceAmount if available, otherwise fallback to price
                jsonBody.priceValue = data.priceAmount || data.price;

                // If we have an existing image URL, don't overwrite it with undefined
                if (course?.image?.secure_url) {
                    jsonBody.image = course.image.secure_url;
                }

                body = jsonBody;
            }

            const result = await updateCourseMutation({ id: courseId, data: body }).unwrap();
            toast.success("✅ تم تحديث بيانات الدورة بنجاح");
            return result;
        } catch (error: any) {
            console.error("Update course FULL error object:", error);
            if (error.data) console.error("Update course error data:", error.data);

            const message = error?.data?.message || error?.message || (typeof error === 'string' ? error : "❌ فشل تحديث الدورة");

            // Special handling for JSON parsing errors which often indicate a field mismatch
            if (message.includes("is not valid JSON") || message.includes("Unexpected token")) {
                console.error("🚨 JSON Parsing Error Detected. Check backend requirements for field types.");
                toast.error("⚠️ خطأ في معالجة البيانات على السيرفر. يرجى التواصل مع الإدارة.");
            } else {
                toast.error(message);
            }
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
    const addVideo = useCallback(async (title: string, chapterTitle?: string) => {
        if (!courseId) {
            toast.error("⚠️ لا يوجد معرف للدورة");
            return undefined;
        }

        try {
            // Generate unique chapter title for each video
            // Use provided chapterTitle or create one based on video title
            const uniqueChapterTitle = chapterTitle || `${title} - Chapter`;

            const payload = {
                courseId,
                title,
                chapterTitle: uniqueChapterTitle,  // ✅ Each video gets its own chapter
                isPreview: false
            };

            // console.log("🎬 Adding video in new chapter:", payload);
            const result = await addVideoMutation(payload).unwrap();

            // console.log("✅ Add video API response:", result);

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

            toast.success(`✅ تم إنشاء الدرس "${title}" في قسم جديد`);
            return result;

        } catch (error: any) {
            console.error("Add video error:", error);
            const message = error?.data?.message || error?.message || "❌ فشل إضافة الدرس";
            toast.error(message);
            return undefined;
        }
    }, [courseId, addVideoMutation]);
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
    const getSignedVideoUrl = useCallback(async (videoId: string, bunnyVideoId?: string): Promise<string | undefined> => {
        if (!videoId) {
            toast.error("⚠️ معرف الفيديو غير موجود");
            return undefined;
        }

        try {
            const params = await getSignedUrlTrigger(videoId).unwrap();
            // console.log("🎬 Received Signed Params:", params);

            if (!params) {
                throw new Error("لم يتم استلام بيانات من السيرفر");
            }

            // Fallback strategy to get Bunny IDs if missing from response
            let activeVideoId = params.videoId || bunnyVideoId;
            let activeLibraryId = params.libraryId;

            // If still missing, search in our local course state
            if (!activeVideoId || !activeLibraryId) {
                // console.log("🔍 Searching fallback metadata for:", videoId);
                const chapters = course?.chapters || [];
                const allLessons = chapters.flatMap(c => c.lessons || []);
                const videoData = allLessons.find(v => v._id === videoId);

                if (videoData?.bunny) {
                    activeVideoId = activeVideoId || videoData.bunny.videoId;
                    activeLibraryId = activeLibraryId || videoData.bunny.libraryId;
                    // console.log("✅ Found metadata in state:", { activeVideoId, activeLibraryId });
                } else {
                    console.warn("❌ Could not find video metadata in course state", {
                        chaptersCount: chapters.length,
                        lessonsCount: allLessons.length
                    });
                }
            }

            // Final fallback for library ID
            activeLibraryId = activeLibraryId || process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;

            // Case 1: Standard Bunny CDN params (token, expires)
            if (params.token && params.expires && activeVideoId && activeLibraryId) {
                // console.log("🛠️ Building Final URL:", { activeLibraryId, activeVideoId });
                return `https://iframe.mediadelivery.net/embed/${activeLibraryId}/${activeVideoId}?token=${params.token}&expires=${params.expires}&autoplay=true&loop=false&muted=false&preload=true&responsive=true`;
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
    }, [getSignedUrlTrigger, course]);

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

            // console.log("Uploading to Bunny CDN:", {
            //     uploadUrl,
            //     videoLibraryId: bunnyDetails.videoLibraryId,
            //     guid: bunnyDetails.guid,
            //     fileSize: file.size,
            //     fileName: file.name,
            // });

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
