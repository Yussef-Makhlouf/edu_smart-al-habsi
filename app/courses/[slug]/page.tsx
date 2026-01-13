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
  Share2,
  Play,
  FileText,
  MonitorPlay,
} from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setCartCourse } from "@/lib/redux/slices/enrollmentSlice";
import { MOCK_COURSES } from "@/lib/data/mockData";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    description:
      "كيف تحول رؤيتك إلى واقع ملموس وتقود فريقك نحو تحقيق المستحيل.",
    longDescription:
      "دورة شاملة تغطي جميع جوانب القيادة الاستراتيجية من بناء الرؤية إلى تنفيذها على أرض الواقع. ستتعلم كيفية إلهام فريقك، واتخاذ قرارات استراتيجية، وبناء ثقافة عمل قوية.",
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
          {
            title: "ما هي القيادة الحقيقية؟",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "صفات القائد الناجح",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
        ],
      },
      {
        title: "بناء الرؤية",
        lessons: [
          {
            title: "كيف تصنع رؤية ملهمة",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "تحويل الرؤية إلى أهداف",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
        ],
      },
      {
        title: "إدارة الفريق",
        lessons: [
          {
            title: "بناء فريق عمل متماسك",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "التفويض الفعال",
            duration: "16:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
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
    videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
    sections: [
      {
        title: "مفهوم الأزمة",
        lessons: [
          {
            title: "تعريف الأزمة وأنواعها",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "علامات الإنذار المبكر",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
        ],
      },
      {
        title: "استراتيجيات المواجهة",
        lessons: [
          {
            title: "خطة الطوارئ",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "التواصل في الأزمات",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
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
    videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
    sections: [
      {
        title: "اختيار الفكرة",
        lessons: [
          {
            title: "كيف تجد فكرة ناجحة",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "دراسة السوق",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
        ],
      },
      {
        title: "بناء المنتج",
        lessons: [
          {
            title: "MVP - الحد الأدنى",
            duration: "30:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "اختبار السوق",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
        ],
      },
      {
        title: "النمو والتوسع",
        lessons: [
          {
            title: "استراتيجيات النمو",
            duration: "28:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "جذب الاستثمار",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
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
  "e-business-secrets": {
    title: "كورس أسرار عالم البزنس الإلكتروني",
    category: "ريادة الأعمال",
    description: "خطوة بخطوة نحو بناء مشروعك الالكتروني ناجح.",
    longDescription:
      "دورة شاملة تغطي جميع جوانب البزنس الإلكتروني من التخطيط إلى التنفيذ والتسويق.",
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
          {
            title: "ما هو البزنس الإلكتروني؟",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "فرص السوق الرقمي",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "بناء خطة العمل",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
        ],
      },
      {
        title: "التسويق الرقمي",
        lessons: [
          {
            title: "استراتيجيات التسويق الإلكتروني",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "التسويق عبر وسائل التواصل",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "إعلانات جوجل وفيسبوك",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
        ],
      },
      {
        title: "إدارة المشروع",
        lessons: [
          {
            title: "إدارة العمليات",
            duration: "20:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "قياس الأداء",
            duration: "16:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
          {
            title: "التوسع والنمو",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/watch?v=PSrVVb1o-Dc",
          },
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
  const slug = (params?.slug as string) || "leadership-secrets";
  const courseDetails = coursesData[slug] || defaultCourse;

  const { user } = useSelector((state: RootState) => state.auth);
  const { items: storeCourses = [] } = useSelector(
    (state: RootState) => state.courses as any
  );
  const { enrollments } = useSelector((state: RootState) => state.enrollment);
  const dispatch = useDispatch();
  const router = useRouter();

  const videoId = getYouTubeVideoId(courseDetails.videoUrl);

  // Use MOCK_COURSES as source if storeCourses is empty
  const activeCourses =
    storeCourses && storeCourses.length > 0 ? storeCourses : MOCK_COURSES;
  const storeCourse = activeCourses.find((c: any) => c.slug === slug);
  const enrolled = storeCourse
    ? enrollments.some((e: any) => e.courseId === storeCourse.id)
    : false;

  // State for active accordion section
  const [activeSection, setActiveSection] = useState<number | null>(0);

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
      priceValue: parseInt(courseDetails.price.replace(/[^0-9]/g, "")) || 0,
      image: "/images/Mockup.jpg",
      instructor: courseDetails.instructor,
      duration: courseDetails.duration,
      rating: courseDetails.rating,
      students: courseDetails.students,
      longDescription: courseDetails.longDescription,
      sections: courseDetails.sections.map((section) => ({
        title: section.title,
        lessons: section.lessons.map((lesson) => ({
          title: lesson.title,
          duration: lesson.duration,
        })),
      })),
      features: courseDetails.features,
    };

    dispatch(setCartCourse(courseToAdd as any));
    router.push("/checkout");
  };

  const handleGoToCourse = () => {
    router.push(`/courses/${slug}/learn`);
  };

  const handleFreeTrial = () => {
    router.push(`/courses/${slug}/learn?trial=true`);
  };

  return (
    <main className="min-h-screen bg-paper">
      <Navbar />

      {/* Creative Hero Section */}
      <div className="relative bg-navy pt-28 pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          {/* Diagonal Split */}
          <div className="absolute top-0 right-0 w-full h-full bg-navy" />
          <div className="absolute bottom-0 left-0 w-3/4 h-full bg-gradient-to-tr from-navy-light/10 to-transparent transform -skew-x-12 opacity-50" />

          {/* Decorative Text */}
          <div className="absolute top-20 left-10 pointer-events-none select-none hidden lg:block">
            <span className="text-[150px] font-bold text-white/[0.02] leading-none">
              دورة احترافية
            </span>
          </div>

          {/* Animated Circles */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative text-right"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-gold/30 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-gold text-sm font-bold tracking-wider">
                  {courseDetails.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {courseDetails.title}
                <span className="text-gold">.</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                {courseDetails.longDescription}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-10 border-y border-white/10 py-6">
                {/* Duration */}
                <div className="text-center md:text-right border-l border-white/10 last:border-0 pl-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                      <Clock size={16} />
                    </div>
                    <span className="text-sm text-gray-400">المدة</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {courseDetails.duration}
                  </p>
                </div>

                {/* Students */}
                <div className="text-center md:text-right border-l border-white/10 last:border-0 px-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                      <Users size={16} />
                    </div>
                    <span className="text-sm text-gray-400">المشتركين</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {courseDetails.students.toLocaleString("en-US")}
                  </p>
                </div>

                {/* Rating */}
                <div className="text-center md:text-right px-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                      <Star size={16} fill="currentColor" />
                    </div>
                    <span className="text-sm text-gray-400">التقييم</span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {courseDetails.rating}
                  </p>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/30 to-transparent p-[1px]">
                    <div className="w-full h-full bg-navy rounded-xl flex items-center justify-center border border-gold/20">
                      <span className="text-2xl font-bold text-gold">م</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center border-2 border-navy">
                    <CheckCircle2 size={12} className="text-navy" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gold mb-1">مدرب المادة</p>
                  <h3 className="text-white font-bold text-lg">
                    {courseDetails.instructor}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Sticky Card placeholder for layout balance */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 -mt-20 lg:-mt-48 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Features - Mobile Only (visible here on desktop only if designated) */}

            {/* Course Content Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gray-50 rounded-bl-full -z-0" />

              <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center text-white">
                    <BookOpen size={20} />
                  </div>
                  محتوى الدورة
                </h2>
                <span className="text-gray-500 text-sm font-medium">
                  {courseDetails.sections.length} أقسام •{" "}
                  {courseDetails.sections.reduce(
                    (acc, s) => acc + s.lessons.length,
                    0
                  )}{" "}
                  درس
                </span>
              </div>

              <div className="space-y-4">
                {courseDetails.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
                  >
                    <button
                      onClick={() =>
                        setActiveSection(activeSection === sIdx ? null : sIdx)
                      }
                      className={`w-full flex items-center justify-between p-5 transition-colors ${
                        activeSection === sIdx
                          ? "bg-navy text-white"
                          : "bg-gray-50 hover:bg-white text-navy"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-lg font-bold opacity-30 ${
                            activeSection === sIdx ? "text-white" : "text-navy"
                          }`}
                        >
                          {(sIdx + 1).toString().padStart(2, "0")}
                        </span>
                        <h3 className="font-bold text-lg">{section.title}</h3>
                      </div>
                      <div
                        className={`transform transition-transform duration-300 ${
                          activeSection === sIdx ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        activeSection === sIdx
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="divide-y divide-gray-100 bg-white">
                        {section.lessons.map((lesson, lIdx) => (
                          <li
                            key={lIdx}
                            className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-colors text-gray-400">
                                <Play size={12} fill="currentColor" />
                              </div>
                              <span className="text-gray-700 font-medium group-hover:text-navy transition-colors">
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              {lesson.duration}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-navy/5 rounded-br-3xl" />
                <h3 className="font-bold text-xl text-navy mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-gold" />
                  ماذا ستتعلم؟
                </h3>
                <ul className="space-y-4">
                  {[1, 2, 3, 4].map((_, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span>
                        مهارات قيادية متقدمة تمكنك من إدارة الفرق بكفاءة عالية
                        وتحقيق النتائج.
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-navy/5 rounded-br-3xl" />
                <h3 className="font-bold text-xl text-navy mb-6 flex items-center gap-2">
                  <FileText className="text-gold" />
                  المتطلبات
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-gray-600 text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span>رغبة حقيقية في التعلم والتطوير</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span>جهاز كمبيوتر أو هاتف ذكي</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span>اتصال بالإنترنت لمشاهدة الدروس</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Enrollment Card - High Visual Impact */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative"
              >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-gold border-l-[60px] border-l-transparent z-10" />

                {/* Video Preview Area */}
                <div className="relative h-48 w-full bg-navy group cursor-pointer overflow-hidden">
                  {videoId ? (
                    <iframe
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=0&mute=1`}
                      title="Preview"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 bg-navy" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-gold/90 text-navy flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-gold/20">
                      <Play fill="currentColor" className="ml-1" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 right-4 text-white text-xs font-bold bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                    معاينة الدورة
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-8 text-center">
                    {enrolled ? (
                      <div className="bg-green-50 text-green-700 font-bold py-3 rounded-xl mb-2">
                        أنت مشترك بالفعل
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-navy">
                          {courseDetails.price}
                        </span>
                      </div>
                    )}

                    {!enrolled && (
                      <p className="text-gray-500 text-sm">
                        شامل ضريبة القيمة المضافة
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {enrolled ? (
                      <Button
                        onClick={handleGoToCourse}
                        className="w-full bg-navy hover:bg-navy-light text-white font-bold h-14 rounded-xl text-lg shadow-lg shadow-navy/20"
                      >
                        متابعة الدورة
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleSubscribe}
                          className="w-full bg-gold hover:bg-gold-dim text-navy font-bold h-14 rounded-xl text-lg shadow-lg shadow-gold/20"
                        >
                          اشترك الآن
                        </Button>
                        <Button
                          onClick={handleFreeTrial}
                          variant="outline"
                          className="w-full border-2 border-navy text-navy font-bold h-14 rounded-xl hover:bg-navy hover:text-white transition-colors"
                        >
                          تجربة مجانية
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="font-bold text-navy mb-4 text-sm">
                      تتضمن هذه الدورة:
                    </h4>
                    <ul className="space-y-3">
                      {courseDetails.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-gold mt-0.5 flex-shrink-0"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <MonitorPlay
                          size={16}
                          className="text-gold mt-0.5 flex-shrink-0"
                        />
                        <span>وصول عبر الجوال والكمبيوتر</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-gray-600">
                        <Award
                          size={16}
                          className="text-gold mt-0.5 flex-shrink-0"
                        />
                        <span>شهادة إتمام رسمية</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Share Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
                <span className="font-bold text-navy text-sm">
                  شارك الدورة مع أصدقائك
                </span>
                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-navy transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
