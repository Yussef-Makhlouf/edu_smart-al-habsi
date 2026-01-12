"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseRowAlternating } from "@/components/course/CourseRowAlternating";
import { CoursesPagination } from "@/components/course/CoursesPagination";

// Sample courses data with slugs
const allCourses = [
    { id: 1, slug: "professional-business", title: "كورس أسرار عالم البزنس الإلكتروني", description: "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة", image: "/images/Mockup.jpg" },
    { id: 2, slug: "real-king", title: "دورة الملك الحقيقي", description: "دورة حصرية للمبدعين في عالم الأعمال وتطوير الذات مع أفضل المدربين", image: "/images/Mockup.jpg" },
    { id: 3, slug: "business-secrets-2", title: "كورس أسرار عالم البزنس الإلكتروني ٢", description: "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة", image: "/images/Mockup.jpg" },
    { id: 4, slug: "business-secrets-3", title: "كورس أسرار عالم البزنس الإلكتروني ٣", description: "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة", image: "/images/Mockup.jpg" },
    { id: 5, slug: "business-secrets-4", title: "كورس أسرار عالم البزنس الإلكتروني ٤", description: "استثمارك بخبرة وتجربة ناجحة المسرة لأختصار المسافة", image: "/images/Mockup.jpg" },
    { id: 6, slug: "business-secrets-5", title: "٢- كورس أسرار عالم البزنس الإلكتروني", description: "استثمارك لمسة وتجربة ناجحة المسرة لأختصار المسافة", image: "/images/Mockup.jpg" },
    { id: 7, slug: "effective-marketing", title: "شفرة التسويق الفعال", description: "تعلم أسرار التسويق الفعال وكيفية الوصول لجمهورك المستهدف", image: "/images/Mockup.jpg" },
    { id: 8, slug: "achievement-magic", title: "كورس سحر الإنجاز ٤", description: "تعلم كيف تنجز أهدافك بسرعة وفعالية مع هذه الدورة المميزة", image: "/images/Mockup.jpg" },
];

const COURSES_PER_PAGE = 6;

export default function CoursesPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allCourses.length / COURSES_PER_PAGE);
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const currentCourses = allCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: "smooth" });
    };

    return (
        <main className="bg-paper min-h-screen">
            <Navbar />

            {/* Hero Section - Creative Design */}
            <section className="relative pt-40 pb-28 bg-navy overflow-hidden">
                {/* Diagonal split */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-navy" />
                    <div
                        className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
                        style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0% 100%)' }}
                    />
                </div>

                {/* Diagonal stripe pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        background: 'repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)'
                    }}
                />

                {/* Large decorative text */}
                <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
                    <span className="text-[200px] font-bold text-white/[0.02] leading-none">دورات</span>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12">
                        <motion.div
                            className="lg:col-span-7"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-3 h-3 bg-gold" />
                                <div className="w-12 h-px bg-gold" />
                                <span className="text-gold text-sm font-bold tracking-widest uppercase">الدورات التدريبية</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                                خطوتك الأولى
                                <br />
                                <span className="text-gold">نحو النجاح</span>
                            </h1>

                            <div className="relative pr-6 border-r-2 border-gold/30 max-w-lg">
                                <p className="text-xl text-white/70 leading-relaxed">
                                    يقدم الدكتور محمد الحبسي خلال هذه الدورات محتوى ثري ومكثف من التجارب والخبرات العملية
                                </p>
                            </div>
                        </motion.div>

                        {/* Stats on right */}
                        <motion.div
                            className="hidden lg:flex lg:col-span-4 lg:col-start-9 flex-col justify-center gap-8"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {[
                                { number: allCourses.length, label: "دورة متاحة" },
                                { number: "+5K", label: "متدرب" },
                            ].map((stat, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-gold/50" />
                                    <div className="pr-4">
                                        <span className="block text-4xl font-bold text-white">{stat.number}</span>
                                        <span className="text-white/50 text-sm">{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Corner decorative elements */}
                <div className="absolute bottom-10 left-10 w-px h-24 bg-gradient-to-t from-gold/50 to-transparent" />
                <div className="absolute bottom-10 left-10 w-24 h-px bg-gradient-to-r from-gold/50 to-transparent" />
            </section>

            {/* Courses Section - Alternating Layout */}
            <div className="relative">
                {currentCourses.map((course, index) => (
                    <CourseRowAlternating
                        key={course.id}
                        title={course.title}
                        description={course.description}
                        image={course.image}
                        href={`/courses/${course.slug}`}
                        isReversed={index % 2 !== 0}
                        isDark={index % 2 !== 0}
                        index={startIndex + index}
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