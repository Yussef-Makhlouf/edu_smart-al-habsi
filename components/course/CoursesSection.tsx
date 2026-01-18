"use client";

import { CoursesCarousel } from "./CoursesCarousel";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useGetPublicCoursesQuery } from "@/lib/api/courses/coursesApi";

export function CoursesSection() {
  const { data: courses, isLoading, error } = useGetPublicCoursesQuery();

  // Transform API data to carousel format
  const carouselCourses =
    courses
      ?.filter((c) => c.isPublished)
      .slice(0, 5)
      .map((course, index) => ({
        id: index + 1,
        _id: course._id,
        title: course.title,
        description: course.description,
        image: course.image?.secure_url || "/images/Mockup.jpg",
        href: `/courses/${course._id}`, // Using _id since the API uses it for details
        category:
          typeof course.category === "object"
            ? course.category.name
            : course.category || "دورة تدريبية",
        variant: (index % 3 === 2 ? "purple" : "gradient") as
          | "purple"
          | "gradient",
      })) || [];

  return (
    <section className="relative py-28 bg-navy overflow-hidden">
      {/* Diagonal accent pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(212,175,55,0.2) 60px, rgba(212,175,55,0.2) 61px)",
        }}
      />

      {/* Large decorative text */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="text-[250px] font-bold text-white/2 leading-none">
          دورات
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-gold" />
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm font-bold tracking-widest uppercase">
                الدورات التدريبية
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              دورات الدكتور
              <br />
              <span className="text-gold">محمد الحبسي</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end items-start gap-6"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              أقام الدكتور محمد الحبسي العديد من الدورات والتي حضرها الآلاف
              وحققت نجاحاً باهراً
            </p>
            <Link
              href="/courses"
              className="group flex items-center gap-3 text-gold hover:text-gold-light transition-colors font-bold text-sm"
            >
              <span>عرض جميع الدورات</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Courses Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
            <p className="text-white/60 font-medium">جاري تحميل الدورات...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-2 text-red-400 bg-red-400/10 px-6 py-3 rounded-full border border-red-400/20">
              <span>فشل في تحميل الدورات. يرجى المحاولة لاحقاً.</span>
            </div>
          </div>
        ) : carouselCourses.length > 0 ? (
          <CoursesCarousel courses={carouselCourses as any} />
        ) : (
          <div className="text-center py-24 border border-white/5 bg-white/2 rounded-3xl">
            <p className="text-white/40 italic text-lg">
              لا توجد دورات متاحة حالياً.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
