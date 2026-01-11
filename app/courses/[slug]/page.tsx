"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Star,
  PlayCircle,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Sample course data - in real app this would come from database/API
const coursesData: Record<
  string,
  {
    title: string;
    category: string;
    description: string;
    longDescription: string;
    price: string;
    duration: string;
    students: number;
    rating: number;
    instructor: string;
    sections: {
      title: string;
      lessons: { title: string; duration: string }[];
    }[];
    features: string[];
  }
> = {
  "leadership-secrets": {
    title: "أسرار القيادة الاستراتيجية",
    category: "القيادة",
    description:
      "كيف تحول رؤيتك إلى واقع ملموس وتقود فريقك نحو تحقيق المستحيل.",
    longDescription:
      "دورة شاملة تغطي جميع جوانب القيادة الاستراتيجية من بناء الرؤية إلى تنفيذها على أرض الواقع. ستتعلم كيفية إلهام فريقك، واتخاذ قرارات استراتيجية، وبناء ثقافة عمل قوية.",
    price: "1200 SAR",
    duration: "12 ساعة",
    students: 2450,
    rating: 4.9,
    instructor: "د. محمد الحبسي",
    sections: [
      {
        title: "مقدمة في القيادة",
        lessons: [
          { title: "ما هي القيادة الحقيقية؟", duration: "15:00" },
          { title: "صفات القائد الناجح", duration: "20:00" },
        ],
      },
      {
        title: "بناء الرؤية",
        lessons: [
          { title: "كيف تصنع رؤية ملهمة", duration: "25:00" },
          { title: "تحويل الرؤية إلى أهداف", duration: "18:00" },
        ],
      },
      {
        title: "إدارة الفريق",
        lessons: [
          { title: "بناء فريق عمل متماسك", duration: "22:00" },
          { title: "التفويض الفعال", duration: "16:00" },
        ],
      },
    ],
    features: [
      "شهادة معتمدة",
      "دعم فني على مدار الساعة",
      "ملفات PDF قابلة للتحميل",
      "تطبيقات عملية",
    ],
  },
  "crisis-management": {
    title: "فن إدارة الأزمات الكبرى",
    category: "القيادة",
    description: "دورة مكثفة تأخذك في رحلة عميقة لفهم كيفية إدارة الأزمات.",
    longDescription:
      "تعلم كيفية التعامل مع الأزمات بحكمة واتخاذ قرارات سريعة وصحيحة تحت الضغط. الدورة تغطي أنواع الأزمات المختلفة واستراتيجيات التعامل مع كل منها.",
    price: "1100 SAR",
    duration: "10 ساعات",
    students: 1820,
    rating: 4.8,
    instructor: "د. محمد الحبسي",
    sections: [
      {
        title: "مفهوم الأزمة",
        lessons: [
          { title: "تعريف الأزمة وأنواعها", duration: "18:00" },
          { title: "علامات الإنذار المبكر", duration: "22:00" },
        ],
      },
      {
        title: "استراتيجيات المواجهة",
        lessons: [
          { title: "خطة الطوارئ", duration: "25:00" },
          { title: "التواصل في الأزمات", duration: "20:00" },
        ],
      },
    ],
    features: [
      "شهادة معتمدة",
      "دراسات حالة واقعية",
      "تمارين محاكاة",
      "جلسات أسئلة وأجوبة",
    ],
  },
  "digital-startup": {
    title: "تأسيس المشاريع الرقمية",
    category: "ريادة الأعمال",
    description: "الدليل الشامل لبناء شركة ناشئة قابلة للنمو.",
    longDescription:
      "من الفكرة إلى أول مليون ريال. دورة متكاملة تغطي جميع مراحل تأسيس المشروع الرقمي من التخطيط إلى التنفيذ والتوسع.",
    price: "950 SAR",
    duration: "15 ساعة",
    students: 3200,
    rating: 4.9,
    instructor: "د. محمد الحبسي",
    sections: [
      {
        title: "اختيار الفكرة",
        lessons: [
          { title: "كيف تجد فكرة ناجحة", duration: "20:00" },
          { title: "دراسة السوق", duration: "25:00" },
        ],
      },
      {
        title: "بناء المنتج",
        lessons: [
          { title: "MVP - الحد الأدنى", duration: "30:00" },
          { title: "اختبار السوق", duration: "22:00" },
        ],
      },
      {
        title: "النمو والتوسع",
        lessons: [
          { title: "استراتيجيات النمو", duration: "28:00" },
          { title: "جذب الاستثمار", duration: "25:00" },
        ],
      },
    ],
    features: [
      "قوالب خطط عمل جاهزة",
      "جلسات إرشاد شخصية",
      "مجتمع رواد الأعمال",
      "شهادة إتمام",
    ],
  },
  "emerging-markets": {
    title: "الاستثمار في الأسواق الناشئة",
    category: "المالية",
    description: "فهم ديناميكيات الأسواق الناشئة وكيفية الاستثمار فيها بذكاء.",
    longDescription:
      "دورة متخصصة في فهم الأسواق الناشئة وفرص الاستثمار فيها، مع تحليل معمق للمخاطر والعوائد المتوقعة.",
    price: "1300 SAR",
    duration: "14 ساعة",
    students: 1560,
    rating: 4.7,
    instructor: "د. محمد الحبسي",
    sections: [
      {
        title: "أساسيات الأسواق الناشئة",
        lessons: [
          { title: "ما هي الأسواق الناشئة؟", duration: "18:00" },
          { title: "فرص النمو", duration: "20:00" },
        ],
      },
      {
        title: "استراتيجيات الاستثمار",
        lessons: [
          { title: "تنويع المحفظة", duration: "25:00" },
          { title: "إدارة المخاطر", duration: "22:00" },
        ],
      },
    ],
    features: [
      "تحليلات أسواق حية",
      "أدوات تقييم الاستثمار",
      "تقارير بحثية",
      "شهادة معتمدة",
    ],
  },
  "wealth-mindset": {
    title: "عقلية الثراء والحكمة",
    category: "التطوير الشخصي",
    description: "أعد برمجة عقلك للتعامل مع المال والفرص بطريقة الأثرياء.",
    longDescription:
      "دورة تحويلية تساعدك على تغيير طريقة تفكيرك حول المال والنجاح، مستوحاة من عقليات أنجح رواد الأعمال في العالم.",
    price: "750 SAR",
    duration: "8 ساعات",
    students: 4100,
    rating: 4.9,
    instructor: "د. محمد الحبسي",
    sections: [
      {
        title: "فهم العقلية",
        lessons: [
          { title: "عقلية الندرة vs الوفرة", duration: "20:00" },
          { title: "أنماط التفكير المحدودة", duration: "25:00" },
        ],
      },
      {
        title: "بناء عقلية الثراء",
        lessons: [
          { title: "تمارين إعادة البرمجة", duration: "30:00" },
          { title: "عادات الأثرياء", duration: "22:00" },
        ],
      },
    ],
    features: ["تمارين يومية", "جلسات تأمل", "كتاب عمل رقمي", "مجتمع دعم"],
  },
  "personal-branding": {
    title: "بناء العلامة الشخصية",
    category: "التسويق",
    description: "كيف تبني حضورًا رقميًا قويًا يجعلك مرجعًا في مجالك.",
    longDescription:
      "تعلم كيفية بناء علامة شخصية قوية على الإنترنت تجذب الفرص والعملاء إليك بشكل طبيعي.",
    price: "850 SAR",
    duration: "9 ساعات",
    students: 2890,
    rating: 4.8,
    instructor: "د. محمد الحبسي",
    sections: [
      {
        title: "أساسيات العلامة الشخصية",
        lessons: [
          { title: "ما هي العلامة الشخصية؟", duration: "15:00" },
          { title: "تحديد هويتك", duration: "20:00" },
        ],
      },
      {
        title: "بناء الحضور الرقمي",
        lessons: [
          { title: "استراتيجية المحتوى", duration: "25:00" },
          { title: "منصات التواصل", duration: "28:00" },
        ],
      },
    ],
    features: [
      "قوالب محتوى",
      "تحليل ملفك الشخصي",
      "استراتيجية مخصصة",
      "شهادة إتمام",
    ],
  },
};

// Default course for unknown slugs
const defaultCourse = coursesData["leadership-secrets"];

export default function CoursePage() {
  const params = useParams();
  const slug = params?.slug as string || "leadership-secrets";
  // Fallback to defaultCourse if slug is found but data missing (unlikely if typed correctly) or first render behavior
  const courseDetails = coursesData[slug] || defaultCourse;

  const { courses, isEnrolled, user, addToCart } = useStore();
  const router = useRouter();

  // Find the basic course object from the store using slug
  const storeCourse = courses.find((c) => c.slug === slug);
  const enrolled = storeCourse ? isEnrolled(storeCourse.id) : false;

  const handleSubscribe = () => {
    if (!user) {
      router.push("/login?redirect=/courses/" + slug);
      return;
    }
    if (storeCourse) {
      addToCart(storeCourse);
      router.push("/checkout");
    }
  };

  const handleGoToCourse = () => {
    // Check if we have a specific 'learn' page or just stay here with 'enrolled' view
    // User requirement: "Student view course in course page alone" -> This suggests this page might transform or link to a viewer.
    // For now, let's assume there is a /learn sub-route or we just refresh.
    // Let's implement a simple alert for now as '/learn' page might not exist yet.
    alert("الانتقال إلى مشغل الدورة...");
    // router.push(`/courses/${slug}/learn`);
  };

  return (
    <main className="bg-paper min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 bg-navy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Course Info */}
            <div>
              <span className="inline-block bg-gold/20 text-gold px-4 py-1 text-sm font-bold mb-6">
                {courseDetails.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {courseDetails.title}
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {courseDetails.longDescription}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={18} className="text-gold" />
                  <span>{courseDetails.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={18} className="text-gold" />
                  <span>{courseDetails.students.toLocaleString()} طالب</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star size={18} className="text-gold fill-gold" />
                  <span>{courseDetails.rating} (تقييم)</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xl">
                  م
                </div>
                <div>
                  <p className="text-white font-bold">{courseDetails.instructor}</p>
                  <p className="text-gray-400 text-sm">المدرب والمؤسس</p>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="bg-white rounded-lg p-8 border border-gray-100">
              <div className="aspect-video bg-navy/10 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-navy/20" />
                <button className="relative z-10 w-20 h-20 rounded-full bg-gold flex items-center justify-center hover:scale-110 transition-transform">
                  <PlayCircle size={40} className="text-navy mr-[-4px]" />
                </button>
                <span className="absolute bottom-4 right-4 bg-navy/80 text-white px-3 py-1 text-sm rounded">
                  فيديو تعريفي
                </span>
              </div>

              <div className="text-4xl font-bold text-navy mb-2">
                {enrolled ? "أنت مشترك ✅" : courseDetails.price}
              </div>
              <p className="text-gray-500 mb-6">{enrolled ? "تم تفعيل الوصول للدورة" : "دفعة واحدة • وصول مدى الحياة"}</p>

              {enrolled ? (
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full text-navy font-bold text-lg py-6 mb-4"
                  onClick={handleGoToCourse}
                >
                  متابعة الدورة
                </Button>
              ) : (
                <>
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full text-navy font-bold text-lg py-6 mb-4"
                    onClick={handleSubscribe}
                  >
                    اشترك الآن
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-navy text-navy hover:bg-navy hover:text-white"
                  >
                    تجربة مجانية
                  </Button>
                </>
              )}

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-bold text-navy mb-4">تتضمن الدورة:</h4>
                <ul className="space-y-3">
                  {courseDetails.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <CheckCircle2 size={18} className="text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="py-20 bg-paper">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-navy mb-8 flex items-center gap-3">
                <BookOpen className="text-gold" />
                محتوى الدورة
              </h2>

              <div className="space-y-4">
                {courseDetails.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-white rounded-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="p-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-navy flex items-center gap-2">
                        <span className="text-gold">#{sIdx + 1}</span>
                        {section.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {section.lessons.length} دروس
                      </span>
                    </div>
                    <ul className="divide-y divide-gray-50">
                      {section.lessons.map((lesson, lIdx) => (
                        <li
                          key={lIdx}
                          className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <PlayCircle size={18} className={`text-gray-400 ${enrolled ? 'text-gold' : ''}`} />
                            <span className="text-gray-700">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">
                            {lesson.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg border border-gray-100 p-6">
                <h3 className="font-bold text-navy mb-4">نظرة سريعة</h3>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-gold" /> المدة
                    </span>
                    <span className="font-bold text-navy">
                      {courseDetails.duration}
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <BookOpen size={16} className="text-gold" /> الدروس
                    </span>
                    <span className="font-bold text-navy">
                      {courseDetails.sections.reduce(
                        (acc, s) => acc + s.lessons.length,
                        0
                      )}
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <Users size={16} className="text-gold" /> الطلاب
                    </span>
                    <span className="font-bold text-navy">
                      {courseDetails.students.toLocaleString()}
                    </span>
                  </li>
                  <li className="flex items-center justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <Award size={16} className="text-gold" /> الشهادة
                    </span>
                    <span className="font-bold text-navy">معتمدة</span>
                  </li>
                </ul>
              </div>

              {/* Download Resources */}
              <div className="bg-navy rounded-lg p-6 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Download size={18} className="text-gold" />
                  موارد الدورة
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  احصل على ملفات PDF وقوالب العمل مع الاشتراك
                </p>
                <Button
                  variant="gold"
                  size="sm"
                  className="w-full text-navy font-bold"
                  disabled={!enrolled}
                >
                  {enrolled ? "تحميل الموارد" : "سجل للوصول"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
