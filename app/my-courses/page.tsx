"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import { MOCK_COURSES } from "@/lib/data/mockData";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

type CourseStatus = "not_started" | "in_progress" | "completed";

interface CourseDisplay {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  status: CourseStatus;
  progress: number;
  completedVideos: number;
  totalVideos: number;
}

const calculateTotalVideos = (course: { sections?: { lessons: any[] }[] }) => {
  if (!course.sections) return 0;
  return course.sections.reduce(
    (total, section) => total + (section.lessons?.length || 0),
    0
  );
};

const getCourseButton = (course: CourseDisplay) => {
  switch (course.status) {
    case "not_started":
      return { text: "ابدأ الدورة", icon: <PlayCircle className="w-4 h-4" /> };
    case "in_progress":
      return { text: "أكمل التعلم", icon: <PlayCircle className="w-4 h-4" /> };
    case "completed":
      return {
        text: "شاهد مرة أخرى",
        icon: <CheckCircle className="w-4 h-4" />,
      };
  }
};

export default function MyCoursesPage() {
  const { enrollments, isLoading: isEnrollmentLoading } = useSelector(
    (state: RootState) => state.enrollment
  );
  const { items: courses, isLoading: isCoursesLoading } = useSelector(
    (state: RootState) => state.courses
  );
  const { user, isLoading: isAuthLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  const isAnyLoading = isAuthLoading || isEnrollmentLoading || isCoursesLoading;

  // Redirect if not logged in after initialization
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  // Derive enrolled courses (merging course details with enrollment progress)
  const enrolledCourses = useMemo(() => {
    // We use MOCK_COURSES as a fallback if Redux items are empty for now
    const sourceCourses = courses.length > 0 ? courses : MOCK_COURSES;

    return enrollments
      .map((enrollment) => {
        const course = sourceCourses.find((c) => c.id === enrollment.courseId);
        if (!course) return null;
        return { ...course, progress: enrollment.progress };
      })
      .filter((c): c is any => c !== null);
  }, [enrollments, courses]);

  const displayCourses = useMemo(() => {
    return enrolledCourses.map((course): CourseDisplay => {
      const totalVideos = calculateTotalVideos(course);
      const progress = course.progress || 0;
      const completedVideos = Math.round((progress / 100) * totalVideos);

      let status: CourseStatus;
      if (progress === 0) status = "not_started";
      else if (progress === 100) status = "completed";
      else status = "in_progress";

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        image: course.image,
        slug: course.slug,
        status,
        progress,
        completedVideos,
        totalVideos,
      };
    });
  }, [enrolledCourses]);

  return (
    <div className="min-h-screen bg-paper flex flex-col" dir="rtl">
      <div className="absolute top-0 w-full z-50">
        <Navbar lightVariant={false} />
      </div>

      {/* Hero Section - Creative Design */}
      <section className="relative pt-40 pb-20 bg-navy overflow-hidden">
        {/* Diagonal split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
            style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>

        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)",
          }}
        />

        {/* Large decorative text */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none">
          <span className="text-[180px] font-bold text-white/[0.02] leading-none">
            دوراتي
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-gold" />
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm font-bold tracking-widest uppercase">
                التعلم
              </span>
            </div>

            {isAnyLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-64 bg-white/10" />
                <Skeleton className="h-6 w-96 bg-white/5" />
              </div>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  دوراتي <span className="text-gold">المسجلة</span>
                </h1>
                <p className="text-white/70 text-lg">
                  تابع تقدمك التعليمي واستمر في رحلة التعلم
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute bottom-10 left-10 w-px h-16 bg-gradient-to-t from-gold/50 to-transparent" />
        <div className="absolute bottom-10 left-10 w-16 h-px bg-gradient-to-r from-gold/50 to-transparent" />
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row-reverse gap-8 items-start relative z-20">
        {/* Course List */}
        <div className="flex-1 space-y-6 order-2 lg:order-1 w-full">
          {isAnyLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 p-6 flex flex-col md:flex-row gap-6"
              >
                <Skeleton className="w-full md:w-56 h-40 shrink-0" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
              </div>
            ))
          ) : displayCourses.length === 0 ? (
            <motion.div
              className="text-center py-16 bg-white border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-gray-600 text-lg mb-6">
                لا توجد دورات مسجلة حالياً
              </p>
              <Link href="/courses">
                <Button variant="gold" className="text-navy font-bold">
                  تصفح الدورات
                </Button>
              </Link>
            </motion.div>
          ) : (
            displayCourses.map((course, index) => {
              const buttonConfig = getCourseButton(course);

              return (
                <motion.div
                  key={course.id}
                  className="relative bg-white border border-gray-100 hover:border-gold/40 transition-colors overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Left accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-gold transition-colors" />

                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Image */}
                    <div className="w-full md:w-56 h-40 shrink-0 relative overflow-hidden">
                      <Image
                        src={course.image || "/course-placeholder.jpg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/course-placeholder.jpg";
                        }}
                      />
                      {/* Corner accent on image */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-t-gold border-r-[30px] border-r-transparent" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-navy mb-2 hover:text-gold transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {course.description}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      {course.status === "in_progress" && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2 text-sm">
                            <span className="text-gray-500">
                              {course.completedVideos} من {course.totalVideos}{" "}
                              فيديو
                            </span>
                            <span className="font-bold text-gold">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5">
                            <div
                              className="bg-gold h-1.5 transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Completed Badge */}
                      {course.status === "completed" && (
                        <div className="flex items-center gap-2 mb-4 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-bold text-sm">
                            تم إكمال الدورة بنجاح
                          </span>
                        </div>
                      )}

                      {/* Action Button */}
                      <Link
                        href={`/courses/${course.slug}/learn`}
                        className="inline-block"
                      >
                        <div className="inline-flex items-center gap-2 text-gold font-bold text-sm hover:gap-3 transition-all">
                          {buttonConfig.icon}
                          <span>{buttonConfig.text}</span>
                          <ArrowLeft className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[280px] shrink-0 order-1 lg:order-2">
          <ProfileSidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
}
