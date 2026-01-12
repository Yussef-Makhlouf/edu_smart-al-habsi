"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseRowAlternating } from "@/components/course/CourseRowAlternating";
import { CoursesPagination } from "@/components/course/CoursesPagination";

// Sample courses data with slugs
const allCourses = [
    {
        id: 1,
        slug: "professional-business",
        title: "كورس أسرار عالم البزنس الإلكتروني",
        description:
            "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة",
        image: "/images/Mockup.jpg",
    },
    {
        id: 2,
        slug: "real-king",
        title: "دورة الملك الحقيقي",
        description:
            "دورة حصرية للمبدعين في عالم الأعمال وتطوير الذات مع أفضل المدربين",
        image: "/images/Mockup.jpg",
    },
    {
        id: 3,
        slug: "business-secrets-2",
        title: "كورس أسرار عالم البزنس الإلكتروني ٢",
        description:
            "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة",
        image: "/images/Mockup.jpg",
    },
    {
        id: 4,
        slug: "business-secrets-3",
        title: "كورس أسرار عالم البزنس الإلكتروني ٣",
        description:
            "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة",
        image: "/images/Mockup.jpg",
    },
    {
        id: 5,
        slug: "business-secrets-4",
        title: "كورس أسرار عالم البزنس الإلكتروني ٤",
        description:
            "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة",
        image: "/images/Mockup.jpg",
    },
    {
        id: 6,
        slug: "business-secrets-5",
        title: "٢- كورس أسرار عالم البزنس الإلكتروني",
        description:
            "استثمارك لمسة وتجربة ناجحة المسرة لأختصار المسافة",
        image: "/images/Mockup.jpg",
    },
    {
        id: 7,
        slug: "effective-marketing",
        title: "شفرة التسويق الفعال",
        description:
            "تعلم أسرار التسويق الفعال وكيفية الوصول لجمهورك المستهدف",
        image: "/images/Mockup.jpg",
    },
    {
        id: 8,
        slug: "achievement-magic",
        title: "كورس سحر الإنجاز ٤",
        description:
            "تعلم كيف تنجز أهدافك بسرعة وفعالية مع هذه الدورة المميزة",
        image: "/images/Mockup.jpg",
    },
];

const COURSES_PER_PAGE = 6;

export default function CoursesPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allCourses.length / COURSES_PER_PAGE);
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const currentCourses = allCourses.slice(
        startIndex,
        startIndex + COURSES_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of courses section
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    return (
        <main className="bg-paper min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative flex items-center justify-center pt-32 pb-16 bg-primary">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="text-gold text-sm font-bold tracking-widest uppercase mb-4 block">
                        المزيد عن الدورات
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        خطوتك الأولى نحو النجاح تبدأ من هنا
                    </h1>
                    <p className="text-white/80 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                        يقدم الدكتور محمد الحبسي خلال هذه الدورة محتوى ثري ومكثف من التجارب
                        والخبرات العملية التي اكتسبها من خلال سنوات من العمل في مجال الأعمال
                        والتنمية البشرية
                    </p>
                </div>
            </div>

            {/* Courses Section - Alternating Layout */}
            <div className="relative">
                {currentCourses.map((course, index) => (
                    <CourseRowAlternating
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.image}
                        href={`/courses/${course.slug}`}
                        isReversed={false}
                        isDark={index % 2 !== 0}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="bg-paper">
                <CoursesPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <Footer />
        </main>
    );
}