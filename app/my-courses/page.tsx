"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  PlayCircle,
  User,
  BookOpen,
  Briefcase,
  Lock,
  LogOut,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { useMemo } from "react";

// Course Status Types
type CourseStatus = "not_started" | "in_progress" | "completed";

interface CourseDisplay {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  status: CourseStatus;
  progress: number; // 0-100
  completedVideos: number;
  totalVideos: number;
}

// Helper function to calculate total videos from course sections
const calculateTotalVideos = (course: { sections?: { lessons: any[] }[] }) => {
  if (!course.sections) return 0;
  return course.sections.reduce((total, section) => {
    return total + (section.lessons?.length || 0);
  }, 0);
};

// Helper function to get button text and style based on status
const getCourseButton = (course: CourseDisplay) => {
  switch (course.status) {
    case "not_started":
      return {
        text: "ابدأ الدورة",
        icon: <PlayCircle className="w-4 h-4" />,
      };
    case "in_progress":
      return {
        text: "أكمل التعلم",
        icon: <PlayCircle className="w-4 h-4" />,
      };
    case "completed":
      return {
        text: "شاهد مرة أخرى",
        icon: <CheckCircle className="w-4 h-4" />,
      };
  }
};

export default function MyCoursesPage() {
  const { enrolledCourses } = useStore();

  // Transform enrolled courses from store to display format
  const displayCourses = useMemo(() => {
    return enrolledCourses.map((course): CourseDisplay => {
      const totalVideos = calculateTotalVideos(course);
      const progress = course.progress || 0;
      const completedVideos = Math.round((progress / 100) * totalVideos);
      
      // Determine status based on progress
      let status: CourseStatus;
      if (progress === 0) {
        status = "not_started";
      } else if (progress === 100) {
        status = "completed";
      } else {
        status = "in_progress";
      }

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
    <div
      className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans"
      dir="rtl"
    >
      <div className="absolute top-0 w-full z-50">
        <Navbar lightVariant={false} />
      </div>

      {/* Hero Section */}
      <section className="bg-navy relative w-full h-[55vh] flex items-center justify-center pt-32 pb-24 overflow-hidden text-center z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#DAA520]/30 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            دوراتي
          </h1>
          <p className="text-white/90 text-lg font-medium">
            تعلم من آخر دوراتنا
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row-reverse gap-8 items-start relative z-20">
        {/* Course List (Left Side in RTL) */}
        <div className="flex-1 space-y-8 order-2 lg:order-1">
          {displayCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                لا توجد دورات مسجلة حالياً
              </p>
              <Link href="/courses">
                <Button className="bg-[#DAA520] hover:bg-[#C8951F] text-white">
                  تصفح الدورات
                </Button>
              </Link>
            </div>
          ) : (
            displayCourses.map((course) => {
              const buttonConfig = getCourseButton(course);

            return (
              <div
                key={course.id}
                className="flex flex-col md:flex-row gap-6 items-start  rounded-xl  p-6"
              >
                {/* Image (Left in RTL, displayed first on desktop) */}
                <div className="w-full md:w-64 h-48 md:h-44 rounded-lg overflow-hidden shrink-0 relative order-1">
                  <div className="w-full h-full relative">
                    <Image
                      src={course.image || "/course-placeholder.jpg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/course-placeholder.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </div>

                {/* Text Content (Right in RTL) */}
                <div className="flex-1 flex flex-col justify-start items-start text-right order-2">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a] mb-2 leading-relaxed">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
                    {course.description}
                  </p>

                  {/* Progress Bar for in-progress courses */}
                  {course.status === "in_progress" && (
                    <div className="w-full max-w-md mb-4">
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-gray-500">
                          {course.completedVideos} من {course.totalVideos} فيديو
                        </span>
                        <span className="font-bold text-[#F5A623]">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#F5A623] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Completed Badge */}
                  {course.status === "completed" && (
                    <div className="flex items-center gap-2 mb-4 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold text-sm">
                        تم إكمال الدورة بنجاح
                      </span>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link href={`/courses/${course.slug}/learn`}>
                    <button
                      className={cn(
                        "inline-flex items-center gap-2 text-[#DAA520] cursor-pointer font-bold text-sm px-5 py-2 rounded-md transition-colors shadow-sm"
                      )}
                    >
                      {buttonConfig.icon}
                      <span>{buttonConfig.text}</span>
                    </button>
                  </Link>
                </div>
              </div>
            );
            })
          )}
        </div>

        {/* Sidebar (Right Side in RTL) - STICKY */}
        <aside className="w-full lg:w-[280px] flex-shrink-0 order-1 lg:order-2">
          <ProfileSidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
}
