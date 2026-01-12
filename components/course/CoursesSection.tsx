"use client";

import { CoursesCarousel } from "./CoursesCarousel";

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
    title: "البرنامج الحاخكي للاعمال والثراء",
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
    <section className="relative py-20 bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            دورات الدكتور محمد الحبسي
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            أقام الدكتور محمد الحبسي العديد من الدورات والتي حضرها الآلاف وقلعت نجاحاً
            باهراً لتعتبر من أهم الدورات في الشرق الأوسط والأكثر حضوراً
          </p>
        </div>  

        {/* Courses Carousel */}
        <CoursesCarousel courses={coursesData} />
      </div>
    </section>
  );
}