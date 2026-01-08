import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    slug: "leadership-secrets",
    title: "أسرار القيادة الاستراتيجية",
    instructor: "د. محمد الحبسي",
    progress: 35,
    totalLessons: 24,
    completedLessons: 8,
    image: "/course1.jpg",
    lastAccessed: "منذ يومين",
  },
  {
    id: 2,
    slug: "wealth-mindset",
    title: "عقلية الثراء والحكمة",
    instructor: "د. محمد الحبسي",
    progress: 10,
    totalLessons: 18,
    completedLessons: 2,
    image: "/course3.jpg",
    lastAccessed: "منذ أسبوع",
  },
];

export default function MyCoursesPage() {
  return (
    <main className="bg-paper min-h-screen flex flex-col">
      <Navbar lightVariant={true} />

      <div className="flex-1 container mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-navy mb-4">
            دوراتي التعليمية
          </h1>
          <p className="text-gray-500 max-w-2xl">
            هنا تجد جميع الدورات التي قمت بالاشتراك فيها. يمكنك استئناف التعلم
            من حيث توقفت في أي وقت.
          </p>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow"
            >
              {/* Thumbnail / Image Placeholder */}
              <div className="md:w-64 h-48 md:h-auto bg-navy/5 relative flex-shrink-0">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-navy/20 font-bold">
                  صورة الدورة
                </div>
                <div className="absolute inset-0 bg-black/5" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sx font-bold text-gold px-2 py-1 bg-gold/10 rounded">
                      قيد التقدم
                    </span>
                    <span className="text-sm text-gray-400">
                      {course.lastAccessed}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-navy mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4">
                    المدرب: {course.instructor}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        {course.progress}% مكتمل
                      </span>
                      <span className="text-gray-400">
                        {course.completedLessons} / {course.totalLessons} درس
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                    <Link href={`/courses/${course.slug}/learn`}>
                      <Button className="font-bold text-navy bg-gold hover:bg-gold/90 gap-2 px-6">
                        <PlayCircle size={18} /> استئناف المشاهدة
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="text-gray-500 hover:text-navy gap-2"
                    >
                      <Clock size={16} /> التفاصيل
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State Suggestion */}
          <div className="bg-navy/5 rounded-xl border border-dashed border-navy/20 p-8 text-center flex flex-col items-center justify-center mt-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <CheckCircle2 className="text-gray-300" size={32} />
            </div>
            <h3 className="font-bold text-navy text-lg mb-2">
              تريد تعلم المزيد؟
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              تصفح مكتبة الدورات الكاملة واكتشف مهارات جديدة لتطوير مسارك
              المهني.
            </p>
            <Link href="/courses">
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white"
              >
                تصفح جميع الدورات
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
