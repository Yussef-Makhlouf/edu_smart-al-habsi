"use client";

import { CoursesCarousel } from "./CoursesCarousel";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const coursesData = [
  {
    id: 1,
    title: "دورة المستوى الاحترافي للاعمال",
    description:
      "دورة متخصصة لرواد الاعمال وأصحاب المشاريع الصغيرة والكبيرة الذين يهدفون إلى",
    image: "/images/Mockup.jpg",
    href: "/courses/professional-business",
    variant: "gradient" as const,
  },
  {
    id: 2,
    title: "البرنامج الداخلي للاعمال والثراء",
    description: "كيف تغير قناعتك الداخلية تجاه المال والاعمال",
    image: "/images/Mockup.jpg",
    href: "/courses/wealth-program",
    variant: "gradient" as const,
  },
  {
    id: 3,
    title: "دورة المسار السريع للنجاح والتميز",
    description:
      "تعلم كيف تضع أهدافك بخطة مدروسة لكي تحققها في أقصر فترة زمنية بأقل مجهود",
    image: "/images/Mockup.jpg",
    href: "/courses/fast-track",
    variant: "purple" as const,
  },
  {
    id: 4,
    title: "دورة إدارة الوقت والإنتاجية",
    description:
      "اكتشف أسرار إدارة الوقت بفعالية وزيادة إنتاجيتك الشخصية والمهنية",
    image: "/images/Mockup.jpg",
    href: "/courses/time-management",
    variant: "gradient" as const,
  },
  {
    id: 5,
    title: "دورة التسويق الرقمي المتقدم",
    description:
      "تعلم استراتيجيات التسويق الرقمي الحديثة وطرق الوصول لجمهورك المستهدف",
    image: "/images/Mockup.jpg",
    href: "/courses/digital-marketing",
    variant: "gradient" as const,
  },
];

export function CoursesSection() {
  return (
    <section className="relative py-28 bg-navy overflow-hidden">
      {/* Diagonal accent pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(212,175,55,0.2) 60px, rgba(212,175,55,0.2) 61px)'
        }}
      />

      {/* Large decorative text */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="text-[250px] font-bold text-white/[0.02] leading-none">
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
              أقام الدكتور محمد الحبسي العديد من الدورات والتي حضرها الآلاف وحققت نجاحاً باهراً
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

        {/* Courses Carousel */}
        <CoursesCarousel courses={coursesData} />
      </div>
    </section>
  );
}