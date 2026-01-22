"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Video,
  Clock,
  Play,
  Upload,
  Loader2,
} from "lucide-react";
import { VideoPreviewModal } from "./VideoPreviewModal";
import { ConfirmModal } from "./ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import { useCourseManager } from "@/lib/hooks/useCourseManager";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/store";
import type {
  Video as VideoType,
  BunnyUploadDetails,
} from "@/lib/api/courses/types";
import { toast } from "sonner";

interface CourseBuilderProps {
  courseId: string;
}

function LessonItem({
  video,
  index,
  onPlay,
  onDelete,
  isSaving,
  isUploadingVideo,
  getBunnyVideoDetails,
}: {
  video: VideoType;
  index: number;
  onPlay: (v: VideoType) => void;
  onDelete: (id: string) => void;
  isSaving: boolean;
  isUploadingVideo: boolean;
  getBunnyVideoDetails: (libId: string | number, vId: string) => Promise<any>;
}) {
  const [duration, setDuration] = useState<number | undefined>(video.duration);

  useEffect(() => {
    if (!duration && video.bunny?.videoId && video.bunny?.libraryId) {
      getBunnyVideoDetails(video.bunny.libraryId, video.bunny.videoId).then(
        (data) => {
          if (data && typeof data.length === "number") {
            setDuration(data.length);
          }
        },
      );
    }
  }, [video, duration, getBunnyVideoDetails]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-colors group bg-white"
    >
      <GripVertical size={16} className="text-gray-300 cursor-move" />
      <span className="text-xs font-bold text-gray-300 w-6">{index + 1}</span>

      <div className="flex-1">
        <p className="text-sm font-medium text-navy">{video.title}</p>
        {duration ? (
          <div className="flex items-center gap-1 text-gray-400 mt-1">
            <Clock size={12} />
            <span className="text-xs">
              {Math.floor(duration / 60)}:
              {(duration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        {video.bunny?.videoId && (
          <button
            onClick={() => onPlay(video)}
            className="p-2 rounded-md bg-gold/10 text-gold hover:bg-gold hover:text-navy transition-colors"
            title="معاينة الفيديو"
          >
            <Play size={14} />
          </button>
        )}

        <button
          onClick={() => onDelete(video._id)}
          disabled={isSaving || isUploadingVideo}
          className="p-2 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export function CourseBuilder({ courseId }: CourseBuilderProps) {
  const {
    course,
    videos,
    addVideo,
    deleteVideo,
    getSignedVideoUrl,
    uploadToBunny,
    getBunnyVideoDetails,
    isLoading,
    isSaving,
  } = useCourseManager(courseId);

  const { isUploadingVideo, uploadProgress } = useSelector(
    (state: RootState) => state.courses,
  );

  const [videoPreview, setVideoPreview] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: "",
    title: "",
  });

  const [pendingUpload, setPendingUpload] = useState<{
    videoId: string;
    bunnyDetails: BunnyUploadDetails;
  } | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    videoId: string;
  }>({
    isOpen: false,
    videoId: "",
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLessonTitle, setNewLessonTitle] = useState("");

  const handleAddVideo = async (file: File) => {
    if (!newLessonTitle.trim()) {
      toast.error("يرجى إدخال عنوان الدرس أولاً");
      return;
    }

    try {
      const result = await addVideo(newLessonTitle);
      if (result) {
        // Start upload immediately
        await uploadToBunny(file, result.bunnyUploadDetails);
        setIsAddingNew(false);
        setNewLessonTitle("");
      }
    } catch (error) {
      console.error("Failed to add video:", error);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAddVideo(file);
    }
  };

  const handleDeleteVideo = (videoId: string) => {
    setDeleteConfirm({
      isOpen: true,
      videoId,
    });
  };

  const confirmDeleteVideo = async () => {
    if (deleteConfirm.videoId) {
      await deleteVideo(deleteConfirm.videoId);
      setDeleteConfirm({ ...deleteConfirm, isOpen: false });
    }
  };

  const handlePlayVideo = async (video: VideoType) => {
    const signedUrl = await getSignedVideoUrl(video._id, video.bunny?.videoId);
    // console.log("🚀 Signed URL:", signedUrl);
    if (signedUrl) {
      setVideoPreview({
        isOpen: true,
        url: signedUrl,
        title: video.title,
      });
    }
  };

  // Group videos by chapter (for now, we'll show all videos in one section)
  // In the future, you can implement chapter management
  const chapters = course?.chapters || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-gold" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy">محتوى الدورة</h2>
          <p className="text-sm text-gray-500 mt-1">
            {chapters.length} أقسام • {videos.length} فيديو
          </p>
        </div>
        {!isAddingNew && (
          <Button
            onClick={() => setIsAddingNew(true)}
            disabled={isSaving || isUploadingVideo}
            variant="outline"
            className="gap-2 border-gold text-gold hover:bg-gold hover:text-navy"
          >
            <Plus size={16} />
            إضافة درس
          </Button>
        )}
      </div>

      {/* New Lesson Form */}
      {isAddingNew && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-sm"
        >
          <div className="flex-1">
            <input
              type="text"
              placeholder="أدخل عنوان الدرس..."
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              value={newLessonTitle}
              onChange={(e) => setNewLessonTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                isUploadingVideo || isSaving
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gold text-navy cursor-pointer hover:bg-gold-dim"
              }`}
            >
              {isUploadingVideo ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              {isUploadingVideo ? "جاري الرفع..." : "اختر الفيديو وابدأ الرفع"}
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={onFileSelect}
                disabled={isUploadingVideo || isSaving}
              />
            </label>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAddingNew(false);
                setNewLessonTitle("");
              }}
              disabled={isUploadingVideo || isSaving}
              className="text-gray-500 hover:text-red-500 disabled:opacity-50"
            >
              إلغاء
            </Button>
          </div>
        </motion.div>
      )}

      {/* Upload Progress */}
      {isUploadingVideo && (
        <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-navy">
              جاري رفع واستخراج الفيديو...
            </span>
            <span className="text-sm font-bold text-navy">
              {uploadProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              className="bg-gold h-2 rounded-full"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {videos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <Video size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 font-medium mb-2">
              لا توجد دروس في هذه الدورة
            </p>
            <p className="text-gray-300 text-sm mb-4">ابدأ بإضافة درس جديد</p>
            <Button
              onClick={() => setIsAddingNew(true)}
              disabled={isSaving}
              className="bg-gold hover:bg-gold-dim text-navy font-bold"
            >
              <Plus size={16} className="ml-2" />
              إضافة أول درس
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence shadow-none>
              {videos
                .filter((v) => v._id !== pendingUpload?.videoId)
                .map((video, index) => (
                  <LessonItem
                    key={video._id}
                    video={video}
                    index={index}
                    onPlay={handlePlayVideo}
                    onDelete={handleDeleteVideo}
                    isSaving={isSaving}
                    isUploadingVideo={isUploadingVideo}
                    getBunnyVideoDetails={getBunnyVideoDetails}
                  />
                ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={videoPreview.isOpen}
        onClose={() => setVideoPreview((prev) => ({ ...prev, isOpen: false }))}
        videoUrl={videoPreview.url}
        title={videoPreview.title}
      />
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
        onConfirm={confirmDeleteVideo}
        title="حذف الدرس"
        description="هل أنت متأكد من حذف هذا الدرس؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="نعم، احذف الدرس"
        cancelText="إلغاء"
        variant="danger"
        isLoading={isSaving}
      />
    </div>
  );
}
