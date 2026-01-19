"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  CheckCircle2,
  Play,
  FileText,
  MonitorPlay,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setCartCourse } from "@/lib/redux/slices/enrollmentSlice";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGetPublicCourseQuery } from "@/lib/api/courses/coursesApi";
import { useGetMyCoursesQuery } from "@/lib/api/enrollment/enrollmentApi";
import { useMemo } from "react";

// Helper function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function CoursePage() {
  const params = useParams();
  const id = params?.slug as string;
  const { data, isLoading, error } = useGetPublicCourseQuery(id);

  const { user } = useSelector((state: RootState) => state.auth);
  const { enrollments } = useSelector((state: RootState) => state.enrollment);
  const dispatch = useDispatch();
  const router = useRouter();

  // State for active accordion section
  const [activeSection, setActiveSection] = useState<number | null>(0);

  // Fetch real enrollments from API (Moved to top to follow Rules of Hooks)
  const { data: myCourses } = useGetMyCoursesQuery(undefined, {
    skip: !user,
  });

  const enrollmentStatus = useMemo(() => {
    const courseId = data?.course?._id;
    if (!courseId) return "none";

    // Check API data first (more reliable)
    if (myCourses && Array.isArray(myCourses)) {
      const enrollment = myCourses.find((item: any) => {
        const c = item.courseId || item.course || item;
        return c._id === id || c.id === id || c._id === courseId;
      });
      if (enrollment) return enrollment.status?.toLowerCase() || "active";
    }

    // Fallback to Redux state (might be useful during transitions)
    if (
      enrollments.some(
        (e: any) => e.courseId === courseId || e.course === courseId,
      )
    )
      return "active";

    return "none";
  }, [enrollments, myCourses, id, data?.course?._id]);

  const isEnrolled = enrollmentStatus === "active";
  const isPending = enrollmentStatus === "pending";

  if (isLoading) {
    return (
      <main className="min-h-screen bg-paper">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Loader2 className="w-16 h-16 text-gold animate-spin mb-4" />
          <p className="text-navy/60 font-medium">
            جاري تحميل تفاصيل الدورة...
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !data?.course) {
    return (
      <main className="min-h-screen bg-paper">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-navy mb-2">
            عذراً، لم نتمكن من العثور على الدورة
          </h2>
          <p className="text-gray-500 mb-8">
            قد تكون الدورة غير متاحة حالياً أو الرابط غير صحيح.
          </p>
          <Button onClick={() => router.push("/courses")} className="bg-navy">
            العودة للدورات
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const { course, videos } = data;

  // Extract video ID if it exists (for preview)
  const previewVideoUrl = course.chapters?.[0]?.lessons?.[0]?.videoUrl || "";
  const youtubeId = getYouTubeVideoId(previewVideoUrl);

  const handleSubscribe = () => {
    if (!user) {
      router.push("/login?redirect=/courses/" + id);
      return;
    }

    const priceValue =
      typeof course.price === "object"
        ? course.price.amount
        : course.price || 0;
    const priceString =
      typeof course.price === "object"
        ? `${course.price.amount} ${course.price.currency}`
        : `${course.price} SAR`;

    const courseToAdd = {
      id: course._id, // Using globalized ID
      _id: course._id,
      slug: course.slug || id,
      category:
        typeof course.category === "object"
          ? course.category.name
          : course.category || "عام",
      title: course.title,
      description: course.description,
      price: priceString,
      priceValue: priceValue,
      image: course.image?.secure_url || "/images/Mockup.jpg",
      instructor: course.instructorId?.userName || "د. محمد الحبسي",
      duration: `${course.totalDuration || 0} ساعة`,
      rating: course.rating?.average || 5.0,
      students: course.studentsCount || 0,
      longDescription: course.description,
      sections:
        course.chapters?.map((chapter) => ({
          title: chapter.title,
          lessons: chapter.lessons?.map((lesson) => ({
            title: lesson.title,
            duration: `${lesson.duration || 0}:00`,
          })),
        })) || [],
      features: course.features
        ? Object.entries(course.features)
            .filter(([_, value]) => value === true)
            .map(([key, _]) => {
              const labels: Record<string, string> = {
                certificate: "شهادة معتمدة",
                lifetimeAccess: "وصول مدى الحياة",
                downloadableResources: "موارد قابلة للتحميل",
                practicalApplications: "تطبيقات عملية",
                mobileAccess: "وصول عبر الجوال",
              };
              return labels[key] || key;
            })
        : ["وصول كامل للمحتوى"],
    };

    dispatch(setCartCourse(courseToAdd as any));
    router.push("/checkout");
  };

  const handleGoToCourse = () => {
    router.push(`/courses/${id}/learn`);
  };

  return (
    <main className="min-h-screen bg-paper" dir="rtl">
      <Navbar />

      {/* Creative Hero Section */}
      <div className="relative bg-navy pt-28 pb-32 lg:pb-60 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-full h-full bg-navy" />
          <div className="absolute bottom-0 left-0 w-3/4 h-full bg-gradient-to-tr from-navy-light/10 to-transparent transform -skew-x-12 opacity-50" />
          <div className="absolute top-20 left-10 pointer-events-none select-none hidden lg:block">
            <span className="text-[150px] font-bold text-white/[0.02] leading-none">
              دورة احترافية
            </span>
          </div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-right">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-gold/30 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-gold text-sm font-bold tracking-wider">
                  {(() => {
                    const cat = course.categoryId || course.category;
                    if (typeof cat === "object" && cat !== null)
                      return (cat as any).name;
                    if (typeof cat === "string") return cat;
                    return "دورة تدريبية";
                  })()}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {course.title}
                <span className="text-gold">.</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                {course.description}
              </p>

              <div className="grid grid-cols-3 gap-6 mb-10 border-y border-white/10 py-6">
                <div className="text-center md:text-right border-l border-white/10 last:border-0 pl-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                      <Clock size={16} />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">
                      المدة
                    </span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {course.totalDuration || 0} ساعة
                  </p>
                </div>
                <div className="text-center md:text-right border-l border-white/10 last:border-0 px-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                      <Users size={16} />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">
                      المشتركين
                    </span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {course.studentsCount?.toLocaleString("en-US") || 0}
                  </p>
                </div>
                <div className="text-center md:text-right px-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                      <Star size={16} fill="currentColor" />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">
                      التقييم
                    </span>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {course.rating?.average || 5.0}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/30 to-transparent p-[1px]">
                    <div className="w-full h-full bg-navy rounded-xl flex items-center justify-center border border-gold/20 overflow-hidden">
                      {course.instructorId?.image?.secure_url ? (
                        <img
                          src={course.instructorId.image.secure_url}
                          alt={course.instructorId.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gold">
                          {course.instructorId?.userName?.[0] || "م"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center border-2 border-navy">
                    <CheckCircle2 size={12} className="text-navy" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gold mb-1">مدرب المادة</p>
                  <h3 className="text-white font-bold text-lg">
                    {course.instructorId?.userName || "د. محمد الحبسي"}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Empty space for the sticky card on desktop */}
            <div className="hidden lg:block lg:col-span-1" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 -mt-24 lg:-mt-52 pb-24 text-right">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-12">
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
                  {course.chapters?.length || 0} أقسام • {videos?.length || 0}{" "}
                  درس
                </span>
              </div>

              <div className="space-y-4">
                {course.chapters?.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
                  >
                    <button
                      onClick={() =>
                        setActiveSection(activeSection === sIdx ? null : sIdx)
                      }
                      className={`w-full flex flex-row-reverse items-center justify-between p-5 transition-colors ${
                        activeSection === sIdx
                          ? "bg-navy text-white"
                          : "bg-gray-50 hover:bg-white text-navy"
                      }`}
                    >
                      <div className="flex flex-row-reverse items-center gap-4">
                        <h3 className="font-bold text-lg">{section.title}</h3>
                        <span
                          className={`text-lg font-bold opacity-30 ${
                            activeSection === sIdx ? "text-white" : "text-navy"
                          }`}
                        >
                          {(sIdx + 1).toString().padStart(2, "0")}
                        </span>
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
                          ? "max-h-[800px] opacity-100"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <ul className="divide-y divide-gray-100 bg-white">
                        {section.lessons?.map((lesson, lIdx) => (
                          <li
                            key={lIdx}
                            className="p-4 flex flex-row-reverse items-center justify-between hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex flex-row-reverse items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-colors text-gray-400">
                                <Play
                                  size={12}
                                  fill="currentColor"
                                  className="mr-0.5"
                                />
                              </div>
                              <span className="text-gray-700 font-medium group-hover:text-navy transition-colors">
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                              {lesson.duration
                                ? `${lesson.duration}:00`
                                : "مجاناً"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-navy/5 rounded-br-3xl" />
                <h3 className="font-bold text-xl text-navy mb-6 flex items-center flex-row-reverse gap-2">
                  <CheckCircle2 className="text-gold" /> ماذا ستتعلم؟
                </h3>
                <ul className="space-y-4">
                  {course.whatYouWillLearn &&
                  course.whatYouWillLearn.length > 0 ? (
                    course.whatYouWillLearn.map((item, i) => (
                      <li
                        key={i}
                        className="flex flex-row-reverse gap-3 text-gray-600 text-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">
                      لم يتم إضافة مهارات بعد.
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 bg-navy/5 rounded-br-3xl" />
                <h3 className="font-bold text-xl text-navy mb-6 flex items-center flex-row-reverse gap-2">
                  <FileText className="text-gold" /> المتطلبات
                </h3>
                <ul className="space-y-4">
                  {course.requirements && course.requirements.length > 0 ? (
                    course.requirements.map((item, i) => (
                      <li
                        key={i}
                        className="flex flex-row-reverse gap-3 text-gray-600 text-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex flex-row-reverse gap-3 text-gray-600 text-sm">
                      <CheckCircle2
                        size={16}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span>اتصال جيد بالإنترنت وجهاد ذكي.</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-gold border-l-[60px] border-l-transparent z-10" />
                <div className="relative h-48 w-full bg-navy group cursor-pointer overflow-hidden">
                  {youtubeId ? (
                    <iframe
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                      src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&controls=0&mute=1`}
                      title="Preview"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={course.image?.secure_url || "/images/Mockup.jpg"}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                </div>

                <div className="p-8 text-center text-navy">
                  <div className="mb-8">
                    {isEnrolled ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-100 mb-6 mx-auto">
                        <CheckCircle2 size={16} />
                        <span className="text-sm font-bold">
                          أنت مشترك بالفعل في هذه الدورة
                        </span>
                      </div>
                    ) : isPending ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full border border-amber-100 mb-6 mx-auto">
                        <Clock size={16} />
                        <span className="text-sm font-bold">
                          طلب الاشتراك بانتظار المراجعة
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-navy">
                          {typeof course.price === "object"
                            ? `${course.price.amount} ${course.price.currency}`
                            : `${course.price || 0} SAR`}
                        </span>
                      </div>
                    )}
                    {!isEnrolled && !isPending && (
                      <p className="text-gray-500 text-sm">
                        شامل ضريبة القيمة المضافة
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {isEnrolled ? (
                      <Button
                        onClick={handleGoToCourse}
                        className="w-full bg-navy hover:bg-navy-light text-white font-bold h-12 rounded-xl text-md flex items-center justify-center gap-2 transition-all duration-300"
                      >
                        <ArrowLeft size={18} />
                        <span>ابدأ التعلم الآن</span>
                      </Button>
                    ) : isPending ? (
                      <Button
                        disabled
                        className="w-full bg-gray-100 text-gray-400 font-bold h-12 rounded-xl text-md flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <span>قيد المراجعة...</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubscribe}
                        className="w-full bg-gold hover:bg-gold-dim text-navy font-bold h-14 rounded-xl text-lg shadow-lg shadow-gold/20"
                      >
                        اشترك الآن
                      </Button>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-100 text-right">
                    <h4 className="font-bold text-navy mb-4 text-sm">
                      تتضمن هذه الدورة:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex flex-row-reverse items-start gap-3 text-sm text-gray-600">
                        <CheckCircle2
                          size={16}
                          className="text-gold mt-0.5 flex-shrink-0"
                        />
                        <span>وصول كامل لجميع الفيديوهات</span>
                      </li>
                      <li className="flex flex-row-reverse items-start gap-3 text-sm text-gray-600">
                        <MonitorPlay
                          size={16}
                          className="text-gold mt-0.5 flex-shrink-0"
                        />
                        <span>وصول عبر الجوال والكمبيوتر</span>
                      </li>
                      <li className="flex flex-row-reverse items-start gap-3 text-sm text-gray-600">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
