"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CourseBuilder } from "@/components/dashboard/CourseBuilder";
import { FileUploadSection } from "@/components/dashboard/FileUploadSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ImagePlus,
  Save,
  Eye,
  Settings2,
  Loader2,
  Plus,
  ArrowRight,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useCourseManager } from "@/lib/hooks/useCourseManager";
import { ConfirmModal } from "@/components/dashboard/ConfirmModal";
import { toast } from "sonner";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get("id") || undefined;

  const {
    course,
    courses,
    createCourse,
    updateCourse,
    deleteCourse,
    isLoading,
    isLoadingCourses,
    isSaving,
  } = useCourseManager(courseId);

  const isAdding = searchParams.get("add") === "true";
  const [courseToDelete, setCourseToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"content" | "files" | "settings">(
    "content"
  );

  const imageInputRef = useRef<HTMLInputElement>(null);

  // Handle form state based on mode (Edit vs Add)
  useEffect(() => {
    if (courseId && course) {
      // Edit mode: Load course data
      setTitle(course.title || "");
      setDescription(course.description || "");

      const currentPrice =
        typeof course.price === "object"
          ? (course.price as any).amount
          : course.price;

      setPrice(currentPrice?.toString() ?? "0");
      setImagePreview(course.image?.secure_url || "");
      setCourseImage(null); // Clear any pending image upload from previous course
    } else if (!courseId) {
      // Add mode: Reset all fields
      setTitle("");
      setDescription("");
      setPrice("");
      setCourseImage(null);
      setImagePreview("");
      setActiveTab("content");
    }
  }, [course, courseId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourseImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("يرجى إدخال عنوان الدورة");
      return;
    }

    if (!description.trim()) {
      toast.error("يرجى إدخال وصف الدورة");
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      toast.error("يرجى إدخال سعر صحيح");
      return;
    }

    const courseData = {
      title: title.trim(),
      description: description.trim(),
      price: priceValue,
    };

    if (courseId) {
      // Update existing course
      await updateCourse(courseData, courseImage || undefined);
    } else {
      // Create new course
      const newCourse = await createCourse(
        courseData,
        courseImage || undefined
      );
      if (newCourse) {
        // Redirect to edit page with new course ID
        router.push(`/dashboard/courses?id=${newCourse._id}`);
      }
    }
  };

  const handlePublish = async () => {
    if (!courseId) {
      toast.error("يجب حفظ الدورة أولاً قبل النشر");
      return;
    }

    // Ensure all required fields are filled before publishing
    if (!title.trim() || !description.trim()) {
      toast.error("يرجى إكمال عنوان ووصف الدورة قبل النشر");
      return;
    }

    if (hasChanges()) {
      toast.error("يرجى حفظ التعديلات الجديدة أولاً قبل تغيير حالة النشر");
      return;
    }

    const newStatus = !course?.isPublished;
    const result = await updateCourse({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      isPublished: newStatus,
    });

    if (result) {
      toast.success(
        newStatus
          ? " تم نشر الدورة بنجاح، هي الآن متاحة للطلاب"
          : "📁 تم تحويل الدورة إلى مسودة"
      );
    }
  };

  const handlePreview = () => {
    if (courseId) {
      window.open(`/courses/${courseId}`, "_blank");
    }
  };

  const hasChanges = () => {
    if (!course) {
      // For new course, check if any field is filled
      return (
        title.trim() !== "" ||
        description.trim() !== "" ||
        price !== "" ||
        courseImage !== null
      );
    }
    // For existing course, compare with current data
    const titleChanged = title.trim() !== (course.title || "");
    const descriptionChanged =
      description.trim() !== (course.description || "");
    const currentPrice =
      typeof course.price === "object"
        ? (course.price as any).amount
        : course.price;

    const priceChanged = price !== (currentPrice?.toString() ?? "0");
    const imageChanged = courseImage !== null;

    return titleChanged || descriptionChanged || priceChanged || imageChanged;
  };

  // If no course is selected and we are not in add mode, show the grid
  if (!courseId && !isAdding) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto pb-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">إدارة الدورات</h1>
            <p className="text-gray-500 mt-1">
              تصفح وقم بإدارة جميع الدورات التدريبية الخاصة بك.
            </p>
          </div>
          <Button
            onClick={() => router.push("/dashboard/courses?add=true")}
            className="gap-2 bg-gold hover:bg-gold-dim text-navy font-bold"
          >
            <Plus size={16} />
            إضافة دورة جديدة
          </Button>
        </div>

        {isLoadingCourses ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-gold" size={40} />
            <p className="text-gray-500">جاري تحميل الدورات...</p>
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((c) => (
              <div
                key={c._id}
                className="group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100"
              >
                {/* Top decorative accent - Golden corner appearing on hover */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-gold border-l-[50px] border-l-transparent z-20 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Left decorative accent - Golden line on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-gold transition-colors duration-300 z-20" />

                {/* Image & Status Section */}
                <div className="aspect-video relative overflow-hidden bg-navy/5">
                  {c.image?.secure_url ? (
                    <img
                      src={c.image.secure_url}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImagePlus size={48} strokeWidth={1.5} />
                    </div>
                  )}

                  {/* High-end Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Floating Status Badge (Top Right) */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg ${
                        c.isPublished
                          ? "bg-green-500 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {c.isPublished ? "منشور" : "مسودة"}
                    </span>
                  </div>

                  {/* Floating Price Tag (Bottom Right) */}
                  <div className="absolute bottom-4 right-4 z-10 bg-navy/90 backdrop-blur-md px-4 py-2 border-r-2 border-gold shadow-xl">
                    <span className="text-gold text-xs font-black tracking-tight">
                      {(() => {
                        const p = c.price;
                        if (
                          p === 0 ||
                          (typeof p === "object" &&
                            p !== null &&
                            (p as any).amount === 0)
                        ) {
                          return "مجاني";
                        }
                        const amount =
                          typeof p === "object" && p !== null
                            ? (p as any).amount
                            : p;
                        return `${amount ?? 0} ر.س`;
                      })()}
                    </span>
                  </div>

                  {/* Floating Delete Button (Top Left - Appears on Hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCourseToDelete({ id: c._id, title: c.title });
                    }}
                    className="absolute top-4 left-4 z-30 w-10 h-10 bg-white/10 hover:bg-red-500 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 shadow-2xl overflow-hidden group/del"
                    title="حذف الدورة"
                  >
                    <Trash2
                      size={18}
                      className="group-hover/del:animate-pulse"
                    />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <h3 className="font-bold text-xl text-navy mb-3 line-clamp-2 leading-tight group-hover:text-gold transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 flex-1 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Edit Button Action Section - Edge to Edge */}
                <button
                  onClick={() => router.push(`/dashboard/courses?id=${c._id}`)}
                  className="w-full relative bg-navy text-white font-bold py-5 px-8 transition-all duration-300 flex items-center justify-between group-hover:bg-gold group-hover:text-navy group/edit overflow-hidden"
                >
                  <div className="flex items-center gap-3 z-10">
                    <Settings2
                      size={18}
                      className="group-hover/edit:rotate-90 transition-transform duration-500"
                    />
                    <span className="tracking-wide">تعديل محتوى الدورة</span>
                  </div>
                  <ArrowLeft
                    size={20}
                    className="z-10 group-hover:-translate-x-2 transition-transform duration-300"
                  />

                  {/* Animated Background Slide (Subtle) */}
                  <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />

                  {/* Animated Underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold transition-all duration-500 group-hover:w-full" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-gold" size={32} />
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">
              لا توجد دورات حالياً
            </h3>
            <p className="text-gray-500 mb-6">
              ابدأ بإنشاء دورتك التدريبية الأولى الآن!
            </p>
            <Button
              onClick={() => router.push("/dashboard/courses?add=true")}
              className="bg-gold hover:bg-gold-dim text-navy font-bold"
            >
              إنشاء أول دورة
            </Button>
          </div>
        )}

        <ConfirmModal
          isOpen={!!courseToDelete}
          onClose={() => setCourseToDelete(null)}
          onConfirm={async () => {
            if (courseToDelete) {
              await deleteCourse(courseToDelete.id);
              setCourseToDelete(null);
            }
          }}
          title="حذف الدورة"
          description={`هل أنت متأكد من حذف دورة "${courseToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`}
          confirmText="نعم، احذف الدورة"
          cancelText="إلغاء"
          variant="danger"
          isLoading={isSaving}
        />
      </div>
    );
  }

  const isPublished = course?.isPublished || false;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              router.push("/dashboard/courses");
            }}
            className="rounded-full hover:bg-navy/5 text-navy"
          >
            <ArrowRight size={24} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-navy">
              {courseId ? "تعديل الدورة" : "إنشاء دورة جديدة"}
            </h1>
            <p className="text-gray-500 mt-1">
              {courseId
                ? "قم بتحديث محتوى وإعدادات دورتك التدريبية."
                : "ابدأ ببناء دورتك التدريبية الجديدة وشارك خبرتك."}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handlePreview}
            variant="outline"
            className="gap-2 border-navy/20 text-navy hover:bg-navy/5 transition-all"
            disabled={!courseId}
          >
            <Eye size={16} />
            معاينة
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading || !hasChanges()}
            className="gap-2 bg-gold hover:bg-gold-dim text-navy font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save size={16} />
                حفظ الدورة
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-0">
        <button
          onClick={() => setActiveTab("content")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "content"
              ? "border-gold text-navy"
              : "border-transparent text-gray-400 hover:text-navy"
          }`}
        >
          المحتوى والأقسام
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "files"
              ? "border-gold text-navy"
              : "border-transparent text-gray-400 hover:text-navy"
          }`}
        >
          الملفات والمرفقات
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "settings"
              ? "border-gold text-navy"
              : "border-transparent text-gray-400 hover:text-navy"
          }`}
        >
          الإعدادات
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "content" && (
            <>
              {/* Course Info */}
              <div className="bg-white p-6 rounded-xl border border-gray-100  space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-navy font-bold">
                    عنوان الدورة
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: أسرار القيادة الاستراتيجية"
                    className="font-bold text-lg border-gray-200 focus:border-gold focus:ring-gold/20"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-navy font-bold">
                    وصف الدورة
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="اكتب وصفاً مختصراً للدورة..."
                    className="min-h-[120px] border-gray-200 focus:border-gold focus:ring-gold/20"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Course Builder (Sections & Lessons) */}
              {courseId ? (
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <CourseBuilder courseId={courseId} />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <p className="text-center text-gray-400 py-8">
                    يرجى حفظ الدورة أولاً لإضافة المحتوى والدروس
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "files" && <FileUploadSection />}

          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <Settings2 size={20} className="text-gold" />
                إعدادات الدورة
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-navy font-bold">السعر</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0"
                      className="pl-16 border-gray-200 focus:border-gold"
                      disabled={isLoading}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      ر.س
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-navy font-bold">التصنيف</Label>
                  <select className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm">
                    <option>القيادة</option>
                    <option>ريادة الأعمال</option>
                    <option>المالية</option>
                    <option>التسويق</option>
                    <option>التطوير الشخصي</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-navy font-bold">مستوى الدورة</Label>
                <div className="flex gap-3">
                  <button className="flex-1 p-3 rounded-lg border-2 border-gold bg-gold/5 text-navy font-medium text-sm">
                    مبتدئ
                  </button>
                  <button className="flex-1 p-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gold hover:bg-gold/5 transition-colors text-sm">
                    متوسط
                  </button>
                  <button className="flex-1 p-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gold hover:bg-gold/5 transition-colors text-sm">
                    متقدم
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Image */}
          <div className="bg-white p-6 rounded-xl border border-gray-100  space-y-4">
            <h3 className="font-bold text-navy">صورة الدورة</h3>
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div
              onClick={() => imageInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-lg h-48 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gold/50 transition-colors cursor-pointer group overflow-hidden"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Course"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus
                    size={32}
                    className="mb-2 group-hover:text-gold transition-colors"
                  />
                  <span className="text-sm">اضغط لرفع صورة</span>
                </>
              )}
            </div>
          </div>

          {/* Publish Settings */}
          <div className="bg-white p-6 rounded-xl border border-gray-100  space-y-4">
            <h3 className="font-bold text-navy">إعدادات النشر</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">
                  الحالة
                </span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {isPublished ? "منشور" : "مسودة"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">
                  الرؤية
                </span>
                <span className="text-sm text-navy font-medium">
                  {isPublished ? "عام" : "خاص"}
                </span>
              </div>
            </div>
            <Button
              onClick={handlePublish}
              disabled={
                !courseId ||
                isSaving ||
                isLoading ||
                (hasChanges() && courseId !== undefined)
              }
              variant="outline"
              className={`w-full font-bold transition-all ${
                isPublished
                  ? "border-amber-500 text-amber-600 hover:bg-amber-50"
                  : "border-green-500 text-green-600 hover:bg-green-50"
              } disabled:opacity-50 disabled:grayscale`}
              title={hasChanges() ? "يرجى حفظ التعديلات أولاً" : ""}
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin ml-2" />
              ) : null}
              {isPublished ? "إلغاء النشر" : "نشر الدورة"}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="bg-navy rounded-xl p-6 text-white space-y-4">
            <h3 className="font-bold">إحصائيات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gold">0</div>
                <div className="text-xs text-gray-300">الطلاب</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gold">0</div>
                <div className="text-xs text-gray-300">المبيعات</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
