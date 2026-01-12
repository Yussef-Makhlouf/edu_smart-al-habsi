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

// Course data type
type CourseData = {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  students: number;
  rating: number;
  instructor: string;
  videoUrl?: string;
  sections: {
    title: string;
    lessons: { title: string; duration: string; videoUrl?: string }[];
  }[];
  features: string[];
};

// Course data
const coursesData: Record<string, CourseData> = {
  "leadership-secrets": {
    title: "أسرار القيادة الاستراتيجية",
    category: "القيادة",
    description: "كيف تحول رؤيتك إلى واقع ملموس وتقود فريقك نحو تحقيق المستحيل.",
    longDescription: "دورة شاملة تغطي جميع جوانب القيادة الاستراتيجية من بناء الرؤية إلى تنفيذها على أرض الواقع. ستتعلم كيفية إلهام فريقك، واتخاذ قرارات استراتيجية، وبناء ثقافة عمل قوية.",
    price: "1200 SAR",
    duration: "12 ساعة",
    students: 2450,
    rating: 4.9,
    instructor: "د. محمد الحبسي",
    videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
    sections: [
      {
        title: "مقدمة في القيادة",
        lessons: [
          { title: "ما هي القيادة الحقيقية؟", duration: "15:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "صفات القائد الناجح", duration: "20:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
      {
        title: "بناء الرؤية",
        lessons: [
          { title: "كيف تصنع رؤية ملهمة", duration: "25:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "تحويل الرؤية إلى أهداف", duration: "18:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
      {
        title: "إدارة الفريق",
        lessons: [
          { title: "بناء فريق عمل متماسك", duration: "22:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "التفويض الفعال", duration: "16:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
    ],
    features: ["شهادة معتمدة", "دعم فني على مدار الساعة", "ملفات PDF قابلة للتحميل", "تطبيقات عملية"],
  },
  "crisis-management": {
    title: "فن إدارة الأزمات الكبرى",
    category: "القيادة",
    description: "دورة مكثفة تأخذك في رحلة عميقة لفهم كيفية إدارة الأزمات.",
    longDescription: "تعلم كيفية التعامل مع الأزمات بحكمة واتخاذ قرارات سريعة وصحيحة تحت الضغط. الدورة تغطي أنواع الأزمات المختلفة واستراتيجيات التعامل مع كل منها.",
    price: "1100 SAR",
    duration: "10 ساعات",
    students: 1820,
    rating: 4.8,
    instructor: "د. محمد الحبسي",
    videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
    sections: [
      {
        title: "مفهوم الأزمة",
        lessons: [
          { title: "تعريف الأزمة وأنواعها", duration: "18:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "علامات الإنذار المبكر", duration: "22:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
      {
        title: "استراتيجيات المواجهة",
        lessons: [
          { title: "خطة الطوارئ", duration: "25:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "التواصل في الأزمات", duration: "20:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
    ],
    features: ["شهادة معتمدة", "دراسات حالة واقعية", "تمارين محاكاة", "جلسات أسئلة وأجوبة"],
  },
  "digital-startup": {
    title: "تأسيس المشاريع الرقمية",
    category: "ريادة الأعمال",
    description: "الدليل الشامل لبناء شركة ناشئة قابلة للنمو.",
    longDescription: "من الفكرة إلى أول مليون ريال. دورة متكاملة تغطي جميع مراحل تأسيس المشروع الرقمي من التخطيط إلى التنفيذ والتوسع.",
    price: "950 SAR",
    duration: "15 ساعة",
    students: 3200,
    rating: 4.9,
    instructor: "د. محمد الحبسي",
    videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
    sections: [
      {
        title: "اختيار الفكرة",
        lessons: [
          { title: "كيف تجد فكرة ناجحة", duration: "20:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "دراسة السوق", duration: "25:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
      {
        title: "بناء المنتج",
        lessons: [
          { title: "MVP - الحد الأدنى", duration: "30:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "اختبار السوق", duration: "22:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
      {
        title: "النمو والتوسع",
        lessons: [
          { title: "استراتيجيات النمو", duration: "28:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "جذب الاستثمار", duration: "25:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
    ],
    features: ["قوالب خطط عمل جاهزة", "جلسات إرشاد شخصية", "مجتمع رواد الأعمال", "شهادة إتمام"],
  },
  "e-business-secrets": {
    title: "كورس أسرار عالم البزنس الإلكتروني",
    category: "ريادة الأعمال",
    description: "خطوة بخطوة نحو بناء مشروعك الالكتروني ناجح.",
    longDescription: "دورة شاملة تغطي جميع جوانب البزنس الإلكتروني من التخطيط إلى التنفيذ والتسويق.",
    price: "1200 SAR",
    duration: "12 ساعة",
    students: 2450,
    rating: 4.9,
    instructor: "د. عمار عمر",
    videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
    sections: [
      {
        title: "مقدمة في البزنس الإلكتروني",
        lessons: [
          { title: "ما هو البزنس الإلكتروني؟", duration: "15:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "فرص السوق الرقمي", duration: "20:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "بناء خطة العمل", duration: "25:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
      {
        title: "التسويق الرقمي",
        lessons: [
          { title: "استراتيجيات التسويق الإلكتروني", duration: "22:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "التسويق عبر وسائل التواصل", duration: "18:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "إعلانات جوجل وفيسبوك", duration: "20:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
      {
        title: "إدارة المشروع",
        lessons: [
          { title: "إدارة العمليات", duration: "20:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "قياس الأداء", duration: "16:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
          { title: "التوسع والنمو", duration: "18:00", videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc" },
        ],
      },
    ],
    features: ["شهادة معتمدة", "دعم فني على مدار الساعة", "ملفات PDF قابلة للتحميل", "تطبيقات عملية"],
  },
};

const defaultCourse = coursesData["leadership-secrets"];

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function CoursePage() {
  const params = useParams();
  const slug = params?.slug as string || "leadership-secrets";
  // Fallback to defaultCourse if slug is found but data missing (unlikely if typed correctly) or first render behavior
  const courseDetails = coursesData[slug] || defaultCourse;

  const { courses, isEnrolled, user, addToCart } = useStore();
  const router = useRouter();

  // Get YouTube video ID
  const videoId = getYouTubeVideoId(courseDetails.videoUrl);

  // Find the basic course object from the store using slug
  const storeCourse = courses.find((c) => c.slug === slug);
  const enrolled = storeCourse ? isEnrolled(storeCourse.id) : false;

  const handleSubscribe = () => {
    if (!user) {
      router.push("/login?redirect=/courses/" + slug);
      return;
    }
    
    // Use storeCourse if available, otherwise create course object from courseDetails
    const courseToAdd = storeCourse || {
      id: Date.now(), // Temporary ID
      slug: slug,
      category: courseDetails.category,
      title: courseDetails.title,
      description: courseDetails.description,
      price: courseDetails.price,
      priceValue: parseInt(courseDetails.price.replace(/[^0-9]/g, '')) || 0,
      image: "/images/Mockup.jpg",
      instructor: courseDetails.instructor,
      duration: courseDetails.duration,
      rating: courseDetails.rating,
      students: courseDetails.students,
      longDescription: courseDetails.longDescription,
      sections: courseDetails.sections.map(section => ({
        title: section.title,
        lessons: section.lessons.map(lesson => ({
          title: lesson.title,
          duration: lesson.duration
        }))
      })),
      features: courseDetails.features
    };
    
    addToCart(courseToAdd);
    router.push("/checkout");
  };

  const handleGoToCourse = () => {
    router.push(`/courses/${slug}/learn`);
  };

  const handleFreeTrial = () => {
    router.push(`/courses/${slug}/learn?trial=true`);
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
                  <span>{courseDetails.students.toLocaleString("en-US")} طالب</span>
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
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl sticky top-24">
              {/* Video Preview */}
              {videoId ? (
                <div className="aspect-video rounded-xl mb-6 overflow-hidden border border-gray-200 shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&start=1010`}
                    title="فيديو تعريفي"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-navy via-navy/90 to-navy/80 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors duration-300" />
                  <button className="relative z-10 w-24 h-24 rounded-full bg-gold flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-gold/50 group-hover:bg-gold/90">
                    <PlayCircle size={48} className="text-navy mr-[-4px]" />
                  </button>
                  <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 text-sm font-medium rounded-lg border border-white/20">
                    فيديو تعريفي
                  </span>
                </div>
              )}

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  {enrolled ? (
                    <div className="text-3xl font-bold text-green-600">
                      أنت مشترك بالفعل
                    </div>
                  ) : (
                    <>
                      <div className="text-4xl font-bold text-navy">
                        {courseDetails.price}
                      </div>
                    </>
                  )}
                </div>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  {enrolled ? (
                    <span className="text-green-600 font-medium">تم تفعيل الوصول للدورة</span>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      <span>دفعة واحدة</span>
                      <span className="text-gray-400">•</span>
                      <span>وصول مدى الحياة</span>
                    </>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              {enrolled ? (
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full text-navy font-bold text-lg py-7 mb-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  onClick={handleGoToCourse}
                >
                  متابعة الدورة
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full text-navy font-bold text-lg py-7 rounded-xl transition-all duration-300 scale-[98%] hover:scale-100"
                    onClick={handleSubscribe}
                  >
                    اشترك الآن
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold py-7 rounded-xl transition-all duration-300 scale-[98%] hover:scale-100"
                    onClick={handleFreeTrial}
                  >
                    تجربة مجانية
                  </Button>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-navy mb-5 text-lg flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-gold" />
                  تتضمن الدورة:
                </h4>
                <ul className="space-y-3.5">
                  {courseDetails.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-700 group/item"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <CheckCircle2 size={18} className="text-gold group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
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
                      {courseDetails.students.toLocaleString("en-US")}
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