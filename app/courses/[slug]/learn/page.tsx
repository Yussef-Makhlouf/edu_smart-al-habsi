"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PlayCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  MessageSquare,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data (matching the structure from the details page)
const courseData = {
  title: "أسرار القيادة الاستراتيجية",
  progress: 35,
  sections: [
    {
      id: 1,
      title: "مقدمة في القيادة",
      lessons: [
        {
          id: 101,
          title: "مرحبًا بك في الدورة",
          duration: "02:30",
          type: "video",
          completed: true,
        },
        {
          id: 102,
          title: "ما هي القيادة الحقيقية؟",
          duration: "15:00",
          type: "video",
          completed: true,
        },
        {
          id: 103,
          title: "اختبار شخصية القائد",
          duration: "10:00",
          type: "quiz",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: "بناء الرؤية",
      lessons: [
        {
          id: 201,
          title: "كيف تصنع رؤية ملهمة",
          duration: "25:00",
          type: "video",
          completed: false,
        },
        {
          id: 202,
          title: "تحويل الرؤية إلى أهداف",
          duration: "18:00",
          type: "video",
          completed: false,
        },
        {
          id: 203,
          title: "ملف عمل: صياغة الرؤية",
          duration: "10:00",
          type: "resource",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "إدارة الفريق",
      lessons: [
        {
          id: 301,
          title: "بناء فريق عمل متماسك",
          duration: "22:00",
          type: "video",
          completed: false,
        },
        {
          id: 302,
          title: "التفويض الفعال",
          duration: "16:00",
          type: "video",
          completed: false,
        },
      ],
    },
  ],
};

export default function CourseLearnPage({
  params,
}: {
  params: { slug: string };
}) {
  const [activeLesson, setActiveLesson] = useState(
    courseData.sections[1].lessons[0]
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<number[]>([1, 2]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden direction-rtl">
      {/* Sidebar - Course Content */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white border-l border-gray-200 flex flex-col h-full flex-shrink-0 relative z-20"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-navy text-lg">محتوى الدورة</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 custom-scrollbar">
              {courseData.sections.map((section) => (
                <div key={section.id} className="border-b border-gray-50">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-bold text-navy text-sm">
                        {section.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {section.lessons.length} دروس
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={cn(
                        "text-gray-400 transition-transform",
                        expandedSections.includes(section.id)
                          ? "rotate-180"
                          : ""
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedSections.includes(section.id) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-gray-50/50"
                      >
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            className={cn(
                              "flex items-center gap-3 p-3 px-6 cursor-pointer border-l-4 transition-all hover:bg-gray-100",
                              activeLesson.id === lesson.id
                                ? "bg-gold/10 border-gold"
                                : "border-transparent bg-transparent"
                            )}
                          >
                            <div
                              className={cn(
                                "mt-0.5",
                                lesson.completed
                                  ? "text-green-500"
                                  : activeLesson.id === lesson.id
                                  ? "text-gold"
                                  : "text-gray-400"
                              )}
                            >
                              {lesson.completed ? (
                                <CheckCircle2 size={16} />
                              ) : (
                                <PlayCircle size={16} />
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={cn(
                                  "text-sm font-medium",
                                  activeLesson.id === lesson.id
                                    ? "text-navy"
                                    : "text-gray-600"
                                )}
                              >
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  {lesson.type === "video"
                                    ? "فيديو"
                                    : lesson.type === "quiz"
                                    ? "اختبار"
                                    : "ملف"}
                                </span>
                                <span className="text-xs text-gray-300">•</span>
                                <span className="text-xs text-gray-400">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-paper">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} className="text-navy" />
              </Button>
            )}
            <div>
              <h1 className="font-bold text-navy line-clamp-1">
                {courseData.title}
              </h1>
              <div className="w-32 md:w-48 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{ width: `${courseData.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex gap-2"
            >
              <MessageSquare size={16} /> مجتمع الدورة
            </Button>
            <Link href="/my-courses">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-navy"
              >
                العودة لدوراتي <ArrowRight size={16} className="mr-2" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-xl shadow-2xl overflow-hidden relative group mb-8">
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors pointer-events-none z-10" />
              {/* Replace this with actual Video Player Implementation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="gold"
                  className="rounded-full w-20 h-20 pl-1 p-0 flex items-center justify-center"
                >
                  <PlayCircle size={40} className="text-navy fill-navy" />
                </Button>
              </div>
              <img
                src="/course-placeholder.jpg"
                alt="Video Thumbnail"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-20">
                <p className="font-bold text-lg">{activeLesson.title}</p>
              </div>
            </div>

            {/* Lesson Navigation */}
            <div className="flex items-center justify-between mb-10">
              <Button variant="outline" className="gap-2">
                <ChevronRight size={16} /> الدرس السابق
              </Button>
              <Button variant="gold" className="gap-2 text-navy font-bold px-8">
                أكملت الدرس <CheckCircle2 size={16} />
              </Button>
              <Button variant="outline" className="gap-2">
                الدرس التالي <ChevronLeft size={16} />
              </Button>
            </div>

            {/* Tabs / Content */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                <button className="px-6 py-4 font-bold text-navy border-b-2 border-gold bg-gold/5">
                  عن الدرس
                </button>
                <button className="px-6 py-4 font-medium text-gray-500 hover:text-navy hover:bg-gray-50">
                  المرفقات (2)
                </button>
                <button className="px-6 py-4 font-medium text-gray-500 hover:text-navy hover:bg-gray-50">
                  المناقشات
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  {activeLesson.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  في هذا الدرس، سنتعرف على الأساسيات الجوهرية للقيادة. سنتحدث عن
                  الفرق بين الإدارة والقيادة، وكيف يمكنك اكتشاف نمط قيادتك الخاص
                  وتطويره. ستخرج من هذا الدرس بفهم عميق لما يعنيه أن تكون قائداً
                  مؤثراً في محيطك العملي والشخصي.
                </p>

                <h3 className="font-bold text-navy mb-3">نقاط رئيسية:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
                  <li>تعريف القيادة في القرن الواحد والعشرين.</li>
                  <li>الأخطاء الخمسة الشائعة التي يقع فيها القادة الجدد.</li>
                  <li>مثلث التأثير: الثقة، الرؤية، والكفاءة.</li>
                </ul>

                <div className="bg-navy/5 rounded-lg p-6 border border-navy/10">
                  <h4 className="font-bold text-navy mb-4 flex items-center gap-2">
                    <Download size={18} className="text-gold" /> ملفات للتحميل
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded text-red-500">
                          <FileText size={18} />
                        </div>
                        <span className="text-gray-700 font-medium">
                          ملخص الدرس PDF
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gold hover:text-navy"
                      >
                        تحميل
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded text-blue-500">
                          <FileText size={18} />
                        </div>
                        <span className="text-gray-700 font-medium">
                          ورقة عمل التمارين
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gold hover:text-navy"
                      >
                        تحميل
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
