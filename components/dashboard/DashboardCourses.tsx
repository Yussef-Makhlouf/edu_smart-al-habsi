"use client";

import { useCourseManager } from "@/lib/hooks/useCourseManager";
import { Plus, Video, Upload, BookOpen, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function DashboardCourses() {
  const { courses, isLoadingCourses, createCourse, isSaving } =
    useCourseManager();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = courses ? Math.ceil(courses.length / itemsPerPage) : 0;

  const paginatedCourses = courses
    ? courses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseDetails, setNewCourseDetails] = useState({
    title: "",
    price: "",
    category: "",
    description: "دورة جديدة تم إضافتها.",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(newCourseDetails.price);
    if (isNaN(priceNum)) {
      toast.error("يرجى إدخال سعر صحيح");
      return;
    }

    const newCourse = await createCourse({
      title: newCourseDetails.title,
      description: newCourseDetails.description,
      price: priceNum,
      categoryId: newCourseDetails.category, // Assuming backend takes category ID or name as categoryId for now pending clarification, or mapped in hook
    });

    if (newCourse) {
      setShowAddCourse(false);
      setNewCourseDetails({
        title: "",
        price: "",
        category: "",
        description: "دورة جديدة تم إضافتها.",
      });
      setVideoFile(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="إدارة المحتوى والدورات"
        action={
          <Button
            onClick={() => setShowAddCourse(!showAddCourse)}
            className="bg-navy text-white gap-2 hover:bg-navy-light"
          >
            <Plus size={18} /> إضافة دورة جديدة
          </Button>
        }
      />

      {/* Add Course Form */}
      {showAddCourse && (
        <div className="bg-white p-6 rounded-xl border border-gold/30 shadow-sm mb-6 max-w-3xl">
          <h3 className="font-bold text-navy mb-4">إنشاء دورة جديدة</h3>
          <form onSubmit={handleAddCourse} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">عنوان الدورة</label>
                <input
                  required
                  className="w-full p-2 border rounded-lg"
                  value={newCourseDetails.title}
                  onChange={(e) =>
                    setNewCourseDetails({
                      ...newCourseDetails,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">السعر (SAR)</label>
                <input
                  required
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={newCourseDetails.price}
                  onChange={(e) =>
                    setNewCourseDetails({
                      ...newCourseDetails,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">التصنيف</label>
                <input
                  required
                  className="w-full p-2 border rounded-lg"
                  value={newCourseDetails.category}
                  onChange={(e) =>
                    setNewCourseDetails({
                      ...newCourseDetails,
                      category: e.target.value,
                    })
                  }
                  placeholder="أدخل تصنيف الدورة"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddCourse(false)}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-gold text-navy font-bold"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "نشر الدورة"
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {isLoadingCourses ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={40} />
        </div>
      ) : courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course: any) => (
            <div
              key={course._id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col group h-full"
            >
              <div className="h-40 bg-gray-100 relative">
                {course.image?.secure_url ? (
                  <img
                    src={course.image.secure_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <BookOpen size={40} />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-navy uppercase">
                  {(() => {
                    const cat = course.categoryId || course.category;
                    if (typeof cat === "object" && cat !== null) return (cat as any).name;
                    if (typeof cat === "string") return cat;
                    return "دورة تدريبية";
                  })()}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-bold text-navy mb-2 line-clamp-1">
                  {course.title}
                </h4>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                  <span className="font-bold text-gold">
                    {(() => {
                      const p = course.price;
                      if (
                        p === 0 ||
                        (typeof p === "object" &&
                          p !== null &&
                          (p as any).amount === 0)
                      )
                        return "مجاني";
                      const amount =
                        typeof p === "object" && p !== null
                          ? (p as any).amount
                          : p;
                      return `${amount ?? 0} ر.س`;
                    })()}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded text-gray-400">
                      <FileText size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded text-gray-400">
                      <Video size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">
            لا توجد دورات متاحة حالياً
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center" dir="ltr">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  href="#"
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {(i + 1).toLocaleString("ar-SA")}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages)
                      setCurrentPage(currentPage + 1);
                  }}
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
