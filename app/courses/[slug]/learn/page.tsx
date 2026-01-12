"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PlayCircle,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  FileText,
  MessageSquare,
  ArrowRight,
  Lock,
  Play,
  Download,
  FolderOpen,
  ListVideo
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
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

// Mock Data (for resources - can be moved to data file later)
const resourceFiles = [
  { id: 1, title: "العقود", type: "folder", items: ["عقد 1.pdf", "عقد 2.pdf"] },
  { id: 2, title: "رسائل التواصل مع الموردين", type: "folder", items: ["مسودة تواصل 1.docx", "قائمة الموردين.xlsx"] },
  { id: 3, title: "ملف حساب التكاليف", type: "file", items: ["شيت التكاليف v2.xlsx"] },
  { id: 4, title: "التمارين التسويقية", type: "folder", items: [] },
  { id: 5, title: "الكتب", type: "folder", items: ["كتاب القواعد الذهبية.pdf"] },
  { id: 6, title: "التمارين الصوتية", type: "folder", items: [] },
  { id: 7, title: "خطة المؤثر على سناب شات", type: "file", items: [] },
  { id: 8, title: "طلب التسجيل في كليك بانك", type: "file", items: ["نموذج التسجيل.pdf"] },
  { id: 9, title: "البطاقة الذهبية", type: "file", items: ["Golden Card.png"] },
  { id: 10, title: "تمارين منزلية", type: "folder", items: [] },
  { id: 11, title: "مذكرة اطلق حملتك الاعلانية", type: "file", items: ["checklist_ads.pdf"] },
  { id: 12, title: "فريق الاستشارات والمتابعة", type: "folder", items: [] },
  { id: 13, title: "ملف الخطة الاستراتيجية للمشروع", type: "file", items: [] },
  { id: 14, title: "الاسئلة الاكثر تكرارا", type: "folder", items: [] },
];

// Extracted Sidebar Component to prevent re-renders losing scroll state
const CourseSidebar = ({
    activeLesson, 
    onLessonSelect, 
    expandedSection, 
    setExpandedSection, 
    expandedResource, 
    setExpandedResource,
    courseSections,
    courseTitle
}: {
    activeLesson: any,
    onLessonSelect: (lesson: any) => void,
    expandedSection: number | null,
    setExpandedSection: (id: number | null) => void,
    expandedResource: number | null,
    setExpandedResource: (id: number | null) => void,
    courseSections: any[],
    courseTitle: string
}) => {
    return (
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {/* 1. Course Content Section */}
        <div className="bg-gold p-3 text-center sticky top-0 z-10 shadow-sm">
          <h3 className="font-bold text-navy text-sm md:text-base">
            محتوى الدورة
          </h3>
        </div>
  
        {/* Sections Accordion */}
        {courseSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border-b border-gray-200">
            {/* Section Title Bar */}
            <div className="bg-gray-200 text-navy p-3 flex justify-between items-center cursor-pointer hover:bg-gray-300 transition-colors">
              <div className="flex flex-col items-start text-right">
                <span className="font-bold text-sm">{section.title}</span>
                <span className="text-[10px] text-gray-500 mt-0.5">
                  {section.lessons.length > 0
                    ? `${section.lessons.length} مقاطع فيديو`
                    : ""}
                </span>
              </div>
            </div>
  
            {/* Lessons List */}
            <div className="bg-white">
              {section.lessons.map((lesson: any, lessonIndex: number) => {
                const isActive = activeLesson.lessonIndex === lessonIndex && activeLesson.sectionIndex === sectionIndex;
                return (
                  <div
                    key={lessonIndex}
                    onClick={() => onLessonSelect({ ...lesson, sectionIndex, lessonIndex })}
                    className={cn(
                      "p-2 border-b border-gray-100 flex gap-3 cursor-pointer transition-all duration-200 relative group",
                      isActive
                        ? "bg-navy text-white"
                        : "hover:bg-gray-50 text-navy",
                      lesson.isLocked ? "opacity-70 grayscale cursor-not-allowed" : ""
                    )}
                  >
                    {/* Thumbnail Image */}
                    <div
                      className={cn(
                        "w-20 h-14 rounded mb-auto shrink-0 relative overflow-hidden border self-center flex items-center justify-center",
                        isActive ? "border-white/20" : "border-gray-200"
                      )}
                    >
                      <div
                        className={cn(
                          "absolute inset-0",
                          isActive ? "bg-white/10" : "bg-primary"
                        )}
                      />
                      <span className="relative z-10 text-[9px] font-bold text-white text-center px-1 truncate w-full">
                        {lesson.title}
                      </span>
  
                      {/* Status Overlay */}
                      {lesson.isLocked && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                          <Lock size={12} className="text-white/80" />
                        </div>
                      )}
                    </div>
  
                    {/* Info */}
                    <div className="flex flex-col justify-center gap-1 flex-1">
                      <h4 className="text-[11px] font-bold line-clamp-2 leading-tight">
                        {lesson.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-[9px]",
                            isActive ? "text-white/60" : "text-gray-400"
                          )}
                        >
                          {courseTitle.substring(0, 20)}...
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-[9px]",
                          isActive ? "text-white/60" : "text-gray-400"
                        )}
                      >
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
  
        {/* 2. Files and Resources Section */}
        <div className="bg-gold p-3 text-center sticky top-0 z-10 shadow-sm mt-0.5">
          <h3 className="font-bold text-navy text-sm md:text-base">
            الملفات والمصادر
          </h3>
        </div>
  
        <div className="bg-[#f0f0f0] min-h-[300px] pb-8">
          {resourceFiles.map((file) => (
            <div
              key={file.id}
              className="border-b border-gray-200 last:border-0"
            >
              <div
                onClick={() =>
                  setExpandedResource(
                    expandedResource === file.id ? null : file.id
                  )
                }
                className="p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer flex justify-between items-center transition-colors"
              >
                <span className="text-sm font-bold text-navy">
                  {file.title}
                </span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-gray-500 transition-transform",
                    expandedResource === file.id ? "rotate-180" : ""
                  )}
                />
              </div>
  
              <AnimatePresence>
                {expandedResource === file.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-white"
                  >
                    {file.items.length > 0 ? (
                      file.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 border-b border-gray-50 flex items-center gap-2 text-xs text-gray-600 hover:text-navy hover:bg-gray-50 cursor-pointer"
                        >
                          <Download size={12} className="text-gold" />
                          {item}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-xs text-gray-400">
                        لا توجد ملفات متاحة حالياً
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    );
};

export default function CourseLearnPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string || "leadership-secrets";
  const isTrial = searchParams?.get("trial") === "true";
  
  const { courses, isEnrolled } = useStore();
  const storeCourse = courses.find((c) => c.slug === slug);
  const enrolled = storeCourse ? isEnrolled(storeCourse.id) : false;
  
  // Redirect if not enrolled and not in trial mode
  useEffect(() => {
    if (!enrolled && !isTrial) {
      router.push(`/courses/${slug}`);
    }
  }, [enrolled, isTrial, slug, router]);
  
  // Get course data
  const courseDetails = coursesData[slug] || defaultCourse;
  
  // Convert course data to the format needed for the page
  const courseSections = useMemo(() => {
    let lessonCount = 0;
    return courseDetails.sections.map((section, sectionIndex) => ({
      id: sectionIndex + 1,
      title: section.title,
      lessons: section.lessons.map((lesson, lessonIndex) => {
        const globalLessonIndex = lessonCount++;
        // If enrolled: all videos available
        // If trial mode: only first 2 videos available
        // Otherwise: all locked (but user should be redirected)
        const isLocked = enrolled ? false : (isTrial ? globalLessonIndex >= 2 : true);
        return {
          id: `${sectionIndex}-${lessonIndex}`,
          title: lesson.title,
          duration: lesson.duration,
          videoUrl: lesson.videoUrl || courseDetails.videoUrl,
          isLocked,
          sectionIndex,
          lessonIndex,
        };
      }),
    }));
  }, [courseDetails, enrolled, isTrial]);
  
  const [activeLesson, setActiveLesson] = useState(
    courseSections[0]?.lessons[0] || null
  );
  const [expandedSection, setExpandedSection] = useState<number | null>(1);
  const [expandedResource, setExpandedResource] = useState<number | null>(null);
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLessonClick = (lesson: any, isMobile = false) => {
    if (!lesson.isLocked) {
      setActiveLesson(lesson);
      if (isMobile) {
        setIsMobileMenuOpen(false); // Close menu on mobile
      }
    }
  };
  
  // Get YouTube video ID if it's a YouTube URL
  const videoId = activeLesson?.videoUrl ? getYouTubeVideoId(activeLesson.videoUrl) : null;

  return (
    <div
      className="flex flex-col min-h-screen bg-white font-sans"
      dir="rtl"
    >
      {/* Top Navbar */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar lightVariant={false} />
      </div>

      {/* Hero Header */}
      <div className="bg-navy relative w-full h-[55vh] flex items-center justify-center overflow-hidden text-center flex-shrink-0 z-10 transition-all">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {courseDetails.title}
          </h1>
          {isTrial && !enrolled && (
            <p className="text-gold text-lg font-medium mt-2">
              تجربة مجانية - أول فيديوين متاحين فقط
            </p>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-20 bg-white items-start">
        
        {/* Mobile Course Menu Trigger */}
        <div className="lg:hidden w-full p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center sticky top-0 z-30">
             <span className="font-bold text-navy">محتوى الدورة</span>
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 border-gold text-navy hover:bg-gold hover:text-white">
                        <ListVideo size={16} />
                        عرض القائمة
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-80">
                    {/* Fixed Height Container for Sheet Content to Scroll properly */}
                   <div className="h-full flex flex-col">
                        <SheetHeader className="p-4 border-b border-gray-100 bg-gray-50 flex-shrink-0">
                            <SheetTitle className="text-navy text-right">محتوى الدورة</SheetTitle>
                        </SheetHeader>
                        <CourseSidebar 
                           activeLesson={activeLesson}
                           onLessonSelect={(l) => handleLessonClick(l, true)}
                           expandedSection={expandedSection}
                           setExpandedSection={setExpandedSection}
                           expandedResource={expandedResource}
                           setExpandedResource={setExpandedResource}
                           courseSections={courseSections}
                           courseTitle={courseDetails.title}
                        />
                   </div>
                </SheetContent>
             </Sheet>
        </div>

        {/* Main Video Area */}
        <main className="flex-1 w-full lg:w-auto bg-white relative p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {activeLesson ? (
              <>
                <div className="aspect-video bg-black rounded-xl overflow-hidden relative mb-8 border border-gray-100 ring-1 ring-gray-200 group">
                  {videoId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&start=10`}
                      title={activeLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      key={activeLesson.id}
                      controls
                      className="w-full h-full object-contain"
                      src={activeLesson.videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                <div className="flex items-start gap-4 mb-8 border-b border-gray-100 pb-8">
                  <div className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center shadow-lg shrink-0">
                    <span className="font-bold text-lg">م</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-2">
                      {activeLesson.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                      {activeLesson.isLocked 
                        ? "يجب الاشتراك في الدورة لمشاهدة هذا الفيديو"
                        : "يجب مشاهدة الفيديو كاملا لتصبح قادر على مشاهدة الفيديو الذي يليه"
                      }
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                <p className="text-gray-400">لا يوجد فيديو متاح</p>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar List (Desktop) */}
        <aside className="hidden lg:flex w-96 bg-gray-100 flex-shrink-0 flex-col border-r border-gray-200 shadow-xl h-screen sticky top-0 overflow-hidden">
             <CourseSidebar 
                activeLesson={activeLesson}
                onLessonSelect={(l) => handleLessonClick(l, false)}
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
                expandedResource={expandedResource}
                setExpandedResource={setExpandedResource}
                courseSections={courseSections}
                courseTitle={courseDetails.title}
             />
        </aside>
      </div>
      <Footer />
    </div>
  );
}
