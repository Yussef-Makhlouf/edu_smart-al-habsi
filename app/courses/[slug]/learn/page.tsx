"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronDown,
  Lock,
  Play,
  Download,
  ListVideo,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  useGetPublicCourseQuery,
  useLazyGetSignedVideoUrlQuery,
} from "@/lib/api/courses/coursesApi";
import { useGetMyCoursesQuery } from "@/lib/api/enrollment/enrollmentApi";
import { Video, Chapter } from "@/lib/api/courses/types";

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Sidebar Component
const CourseSidebar = ({
  activeLesson,
  onLessonSelect,
  expandedResource,
  setExpandedResource,
  courseChapters,
  courseTitle,
  enrolled,
  isTrial,
}: {
  activeLesson: Video | null;
  onLessonSelect: (lesson: Video) => void;
  expandedResource: number | null;
  setExpandedResource: (id: number | null) => void;
  courseChapters: Chapter[];
  courseTitle: string;
  enrolled: boolean;
  isTrial: boolean;
}) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 bg-white">
      <div className="bg-gold p-3 text-center sticky top-0 z-10 shadow-sm">
        <h3 className="font-bold text-navy text-sm md:text-base">
          محتوى الدورة
        </h3>
      </div>

      {courseChapters?.map((chapter, chapterIdx) => (
        <div key={chapter._id} className="border-b border-gray-200">
          <div className="bg-gray-100 text-navy p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors">
            <div className="flex flex-col items-start text-right">
              <span className="font-bold text-sm">{chapter.title}</span>
              <span className="text-[10px] text-gray-500 mt-0.5">
                {chapter.lessons?.length || 0} دروس
              </span>
            </div>
          </div>

          <div className="bg-white">
            {chapter.lessons?.map((lesson, lessonIdx) => {
              const isActive = activeLesson?._id === lesson._id;
              // Trial logic: only first 2 lessons globally are free
              const globalIdx = chapterIdx * 100 + lessonIdx; // Simple global check
              const isLocked = !enrolled && (!isTrial || globalIdx >= 2);

              return (
                <div
                  key={lesson._id}
                  onClick={() => !isLocked && onLessonSelect(lesson)}
                  className={cn(
                    "p-3 border-b border-gray-50 flex gap-3 cursor-pointer transition-all duration-200 relative group",
                    isActive
                      ? "bg-navy text-white"
                      : "hover:bg-gray-50 text-navy",
                    isLocked ? "opacity-60 cursor-not-allowed" : ""
                  )}
                >
                  <div
                    className={cn(
                      "w-16 h-10 rounded shrink-0 relative overflow-hidden flex items-center justify-center bg-gray-200",
                      isActive ? "bg-white/10" : ""
                    )}
                  >
                    {isLocked ? (
                      <Lock size={14} className="text-gray-400" />
                    ) : (
                      <Play
                        size={14}
                        className={isActive ? "text-gold" : "text-navy"}
                        fill="currentColor"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h4 className="text-[11px] font-bold line-clamp-2 leading-tight">
                      {lesson.title}
                    </h4>
                    <span
                      className={cn(
                        "text-[9px] mt-1",
                        isActive ? "text-white/60" : "text-gray-400"
                      )}
                    >
                      {lesson.duration ? `${lesson.duration} دقيقة` : "فيديو"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Resources Placeholder */}
      {/* <div className="bg-gold p-3 text-center sticky top-0 z-10 shadow-sm mt-0.5">
        <h3 className="font-bold text-navy text-sm md:text-base">
          الملفات والمصادر
        </h3>
      </div>
      <div className="p-8 text-center text-gray-400 text-sm">
        لا توجد ملفات مرفقة حالياً
      </div> */}
    </div>
  );
};

export default function CourseLearnPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params?.slug as string;
  const isTrial = searchParams?.get("trial") === "true";

  const { enrollments } = useSelector((state: RootState) => state.enrollment);
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch real enrollments from API
  const { data: myCourses } = useGetMyCoursesQuery(undefined, {
    skip: !user,
  });

  const enrolled = useMemo(() => {
    // Check Redux state first (fast)
    if (enrollments.some((e: any) => e.courseId === id || e.course === id))
      return true;

    // Check API data (reliable)
    if (!myCourses) return false;
    return myCourses.some((item: any) => {
      const course = item.courseId || item.course || item;
      return course._id === id || course.id === id;
    });
  }, [enrollments, myCourses, id]);

  const { data, isLoading, error } = useGetPublicCourseQuery(id);
  const [triggerSign, { data: signedData, isFetching: isSigning }] =
    useLazyGetSignedVideoUrlQuery();

  const [activeLesson, setActiveLesson] = useState<Video | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);

  // Set first lesson as default
  useEffect(() => {
    if (data?.course?.chapters?.[0]?.lessons?.[0] && !activeLesson) {
      setActiveLesson(data.course.chapters[0].lessons[0]);
    }
  }, [data, activeLesson]);

  // Handle Bunny signing
  useEffect(() => {
    if (activeLesson?.bunny?.videoId && enrolled) {
      triggerSign(activeLesson._id);
    }
  }, [activeLesson, enrolled, triggerSign]);

  // Protection
  useEffect(() => {
    if (!isLoading && !data) return; // Wait for data
    if (!enrolled && !isTrial && !isLoading) {
      router.push(`/courses/${id}`);
    }
  }, [enrolled, isTrial, id, router, isLoading, data]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Loader2 className="w-16 h-16 text-gold animate-spin mb-4" />
          <p className="text-navy/60 font-medium font-sans">
            جاري تحضير الدروس...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data?.course) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-2 font-sans">
            حدث خطأ في تحميل الدورة
          </h2>
          <Button
            onClick={() => router.push("/courses")}
            className="bg-navy mt-4"
          >
            العودة للرئيسية
          </Button>
        </div>
      </main>
    );
  }

  const { course } = data;
  const youtubeId = activeLesson
    ? getYouTubeVideoId((activeLesson as any).videoUrl)
    : null;
  const bunnyUrl = signedData?.token
    ? `https://iframe.mediadelivery.net/embed/${activeLesson?.bunny?.libraryId}/${activeLesson?.bunny?.videoId}?token=${signedData.token}&autoplay=true`
    : null;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans" dir="rtl">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar lightVariant={false} />
      </div>

      <div className="bg-navy relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden text-center flex-shrink-0 z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {course.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/60 text-sm">
            <span>{course.instructorId?.userName || "د. محمد الحبسي"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span>{course.chapters?.length || 0} أقسام</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative z-20 bg-white items-start">
        {/* Mobile Toolbar */}
        <div className="lg:hidden w-full p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center sticky top-0 z-30">
          <span className="font-bold text-navy">قائمة المحتوى</span>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-gold text-navy"
              >
                <ListVideo size={16} /> عرض الدروس
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-80">
              <div className="h-full flex flex-col">
                <SheetHeader className="p-4 border-b border-gray-100 bg-gray-50">
                  <SheetTitle className="text-navy text-right">
                    محتوى الدورة
                  </SheetTitle>
                </SheetHeader>
                <CourseSidebar
                  activeLesson={activeLesson}
                  onLessonSelect={(l) => {
                    setActiveLesson(l);
                    setIsMobileMenuOpen(false);
                  }}
                  expandedResource={expandedResource}
                  setExpandedResource={setExpandedResource}
                  courseChapters={course.chapters}
                  courseTitle={course.title}
                  enrolled={enrolled}
                  isTrial={isTrial}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Video Player Main */}
        <main className="flex-1 w-full lg:w-auto bg-white p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative mb-8 shadow-2xl group">
              {isSigning ? (
                <div className="absolute inset-0 flex items-center justify-center bg-navy/80">
                  <Loader2 className="w-12 h-12 text-gold animate-spin" />
                </div>
              ) : youtubeId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                  title={activeLesson?.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : bunnyUrl ? (
                <iframe
                  src={bunnyUrl}
                  loading="lazy"
                  className="w-full h-full"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                  allowFullScreen
                />
              ) : (activeLesson as any)?.videoUrl ? (
                <video
                  key={activeLesson?._id}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  <source
                    src={(activeLesson as any).videoUrl}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-navy/90">
                  {enrolled ? (
                    <>
                      <PlayCircle className="w-20 h-20 text-gold/20 mb-4" />
                      <p className="text-white/60">
                        اختر درساً للبدء في المشاهدة
                      </p>
                    </>
                  ) : (
                    <>
                      <Lock className="w-16 h-16 text-gold mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        محتوى محمي
                      </h3>
                      <p className="text-white/40 mb-8 max-w-sm">
                        هذا الدرس متاح فقط للمشتركين في هذه الدورة التدريبية.
                      </p>
                      <Button
                        onClick={() => router.push(`/courses/${id}`)}
                        className="bg-gold text-navy font-bold px-8 h-12"
                      >
                        اشترك الآن
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>

            {activeLesson && (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold shadow-sm shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-1">
                      {activeLesson.title}
                    </h2>
                    <p className="text-gray-400 text-sm font-medium">
                      القسم الحالي:{" "}
                      {
                        course.chapters.find((c) =>
                          c.lessons.some((l) => l._id === activeLesson._id)
                        )?.title
                      }
                    </p>
                  </div>
                </div>
                {enrolled && (
                  <Button
                    variant="outline"
                    className="gap-2 border-green-100 text-green-600 hover:bg-green-50"
                  >
                    تم إتمام الدرس
                  </Button>
                )}
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-bold text-navy mb-4">
                نبذة عن الدرس
              </h3>
              <p className="text-gray-600 leading-relaxed">
                هذا المحتوى مقدم خصيصاً لطلاب دورة {course.title}. يرجى متابعة
                الفيديو للنهاية لضمان تحقيق أقصى استفادة تعليمية.
              </p>
            </div>
          </div>
        </main>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-96 bg-gray-50 flex-shrink-0 flex-col border-r border-gray-100 h-[calc(100vh-64px)] sticky top-16 overflow-hidden">
          <CourseSidebar
            activeLesson={activeLesson}
            onLessonSelect={setActiveLesson}
            expandedResource={expandedResource}
            setExpandedResource={setExpandedResource}
            courseChapters={course.chapters}
            courseTitle={course.title}
            enrolled={enrolled}
            isTrial={isTrial}
          />
        </aside>
      </div>
      <Footer />
    </div>
  );
}

function PlayCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}
