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
  Users,
} from "lucide-react";
import { useCourseManager } from "@/lib/hooks/useCourseManager";
import { ConfirmModal } from "@/components/dashboard/ConfirmModal";
import { toast } from "sonner";
import { useGetCategoriesQuery } from "@/lib/api/categories/categoriesApi";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"content" | "files" | "settings">(
    "content",
  );

  // New Fields
  const [currency, setCurrency] = useState("SAR");
  const [totalDuration, setTotalDuration] = useState("");
  const [level, setLevel] = useState("متوسط");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);

  const [learnInput, setLearnInput] = useState("");
  const [reqInput, setReqInput] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: categories } = useGetCategoriesQuery();

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

      const cat = course.category || (course as any).categoryId;
      const currentCatId =
        cat && typeof cat === "object" ? (cat as any)._id : cat;
      // console.log("📂 Setting Category ID:", currentCatId);
      setCategoryId(currentCatId?.toString() || "");

      // Load new fields
      setCurrency((course as any).currency || "SAR");
      setTotalDuration((course as any).totalDuration?.toString() || "");
      setLevel((course as any).level || "متوسط");
      setWhatYouWillLearn((course as any).whatYouWillLearn || []);
      setRequirements((course as any).requirements || []);

      setImagePreview(course.image?.secure_url || "");
      setCourseImage(null); // Clear any pending image upload from previous course
    } else if (!courseId) {
      // Add mode: Reset all fields
      setTitle("");
      setDescription("");
      setPrice("");
      setCategoryId("");
      setCurrency("SAR");
      setTotalDuration("");
      setLevel("متوسط");
      setWhatYouWillLearn([]);
      setRequirements([]);
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

    if (whatYouWillLearn.length === 0) {
      toast.error("يرجى إضافة عنصر واحد على الأقل في قسم 'ماذا ستتعلم'");
      return;
    }

    if (requirements.length === 0) {
      toast.error("يرجى إضافة عنصر واحد على الأقل في قسم 'متطلبات الدورة'");
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
      priceAmount: priceValue,
      currency,
      categoryId: categoryId || undefined,
      totalDuration: parseInt(totalDuration) || 0,
      whatYouWillLearn,
      requirements,
      level,
    };

    if (courseId) {
      // Update existing course
      await updateCourse(courseData, courseImage || undefined);
    } else {
      // Create new course
      const newCourse = await createCourse(
        courseData,
        courseImage || undefined,
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

    const isCurrentlyPublished = course?.isPublished;

    const newStatus = !isCurrentlyPublished;
    const priceValue = parseFloat(price);

    const result = await updateCourse({
      title: title.trim(),
      description: description.trim(),
      priceAmount: isNaN(priceValue) ? 0 : priceValue,
      currency,
      categoryId: categoryId || undefined,
      totalDuration: parseInt(totalDuration) || 0,
      whatYouWillLearn,
      requirements,
      level,
      isPublished: newStatus,
    });

    if (result) {
      toast.success(
        newStatus
          ? " تم نشر الدورة بنجاح، هي الآن متاحة للطلاب"
          : "📁 تم تحويل الدورة إلى مسودة",
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

    const cat = course.category;
    const currentCatId = typeof cat === "object" ? cat._id : cat;
    const categoryChanged = categoryId !== (currentCatId || "");
    const currencyChanged = currency !== ((course as any).currency || "SAR");
    const durationChanged =
      totalDuration !== ((course as any).totalDuration?.toString() || "");
    const levelChanged = level !== ((course as any).level || "متوسط");
    const learnChanged =
      JSON.stringify(whatYouWillLearn) !==
      JSON.stringify((course as any).whatYouWillLearn || []);
    const reqsChanged =
      JSON.stringify(requirements) !==
      JSON.stringify((course as any).requirements || []);
    const imageChanged = courseImage !== null;

    return (
      titleChanged ||
      descriptionChanged ||
      priceChanged ||
      categoryChanged ||
      currencyChanged ||
      durationChanged ||
      levelChanged ||
      learnChanged ||
      reqsChanged ||
      imageChanged
    );
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map((c, index) => (
                  <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="aspect-video relative overflow-hidden bg-navy/5">
                  {c.image?.secure_url ? (
                    <img
                      src={c.image.secure_url}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-navy/20">
                      <ImagePlus size={40} strokeWidth={1} />
                    </div>
                  )}

                  {/* High-Contrast Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${
                        c.isPublished
                          ? "bg-emerald-500 text-white"
                          : "bg-stone-500 text-white"
                      }`}
                    >
                      {c.isPublished && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-100"></span>
                        </span>
                      )}
                      {c.isPublished ? "منشور" : "مسودة"}
                    </div>
                  </div>

                  {/* Floating Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-navy text-gold px-4 py-2 rounded-2xl text-sm font-black border border-white/10 shadow-xl">
                    {(() => {
                      const p = c.price;
                      if (
                        p === 0 ||
                        (typeof p === "object" && (p as any)?.amount === 0)
                      )
                        return "مجاني";
                      const amount =
                        typeof p === "object" ? (p as any)?.amount : p;
                      return `${amount ?? 0} ر.س`;
                    })()}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-bold rounded-md">
                      {(c.categoryId as any)?.name || "عام"}
                    </span>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Users size={14} className="text-gray-300" />
                      <span className="text-xs font-medium">
                        {c.studentsCount || 0}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-navy text-lg mb-2 line-clamp-1 group-hover:text-gold transition-colors duration-300">
                    {c.title}
                  </h3>

                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-6">
                    {c.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <Button
                      onClick={() =>
                        router.push(`/dashboard/courses?id=${c._id}`)
                      }
                      className="flex-1 h-11 bg-navy hover:bg-navy/90 text-white font-bold rounded-2xl gap-2 shadow-sm transition-all active:scale-95"
                    >
                      <Settings2 size={16} />
                      تعديل المحتوى
                    </Button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCourseToDelete({ id: c._id, title: c.title });
                      }}
                      className="w-11 h-11 flex items-center justify-center rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {courses.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center mt-10" dir="ltr">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      href="#"
                    />
                  </PaginationItem>

                  {Array.from({
                    length: Math.ceil(courses.length / ITEMS_PER_PAGE),
                  }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
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
                        if (
                          currentPage < Math.ceil(courses.length / ITEMS_PER_PAGE)
                        ) {
                          setCurrentPage(currentPage + 1);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      href="#"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              router.push("/dashboard/courses");
            }}
            className="rounded-full hover:bg-navy/5 text-navy shrink-0"
          >
            <ArrowRight size={24} />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy">
              {courseId ? "تعديل الدورة" : "إنشاء دورة جديدة"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {courseId
                ? "قم بتحديث محتوى وإعدادات دورتك التدريبية."
                : "ابدأ ببناء دورتك التدريبية الجديدة وشارك خبرتك."}
            </p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading || !hasChanges()}
            className="flex-1 md:flex-none gap-2 bg-gold hover:bg-gold-dim text-navy font-bold disabled:opacity-50 disabled:cursor-not-allowed h-11"
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
        {/* <button
          onClick={() => setActiveTab("files")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "files"
              ? "border-gold text-navy"
              : "border-transparent text-gray-400 hover:text-navy"
          }`}
        >
          الملفات والمرفقات
        </button> */}
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

          {/* {activeTab === "files" && <FileUploadSection />} */}

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
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm outline-none"
                  >
                    <option value="">اختر تصنيف...</option>
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-navy font-bold">مستوى الدورة</Label>
                <div className="flex gap-3">
                  {["مبتدئ", "متوسط", "متقدم"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        level === l
                          ? "border-gold bg-gold/5 text-navy"
                          : "border-gray-100 text-gray-500 hover:border-gold/30"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Duration and Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-navy font-bold">
                    مدة الدورة (بالساعات)
                  </Label>
                  <Input
                    type="number"
                    value={totalDuration}
                    onChange={(e) => setTotalDuration(e.target.value)}
                    placeholder="مثال: 12"
                    className="border-gray-200 focus:border-gold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-navy font-bold">العملة</Label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm outline-none"
                  >
                    <option value="SAR">SAR (ريال سعودي)</option>
                    <option value="USD">USD (دولار أمريكي)</option>
                    <option value="EGP">EGP (جنيه مصري)</option>
                  </select>
                </div>
              </div>

              {/* What You Will Learn */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <Label className="text-navy font-bold">
                  ماذا ستتعلم في هذه الدورة؟{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={learnInput}
                    onChange={(e) => setLearnInput(e.target.value)}
                    placeholder="مثال: إدارة الفرق، بناء الرؤية..."
                    className="flex-1 border-gray-200 focus:border-gold"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (learnInput.trim()) {
                          setWhatYouWillLearn([
                            ...whatYouWillLearn,
                            learnInput.trim(),
                          ]);
                          setLearnInput("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (learnInput.trim()) {
                        setWhatYouWillLearn([
                          ...whatYouWillLearn,
                          learnInput.trim(),
                        ]);
                        setLearnInput("");
                      }
                    }}
                    className="bg-navy text-white hover:bg-navy-dim"
                  >
                    إضافة
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {whatYouWillLearn.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gold/10 text-navy px-3 py-1 rounded-full text-sm flex items-center gap-2 group"
                    >
                      {tag}
                      <button
                        onClick={() =>
                          setWhatYouWillLearn(
                            whatYouWillLearn.filter((_, i) => i !== idx),
                          )
                        }
                        className="text-gray-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4 pt-4 border-t border-gray-50">
                <Label className="text-navy font-bold">
                  متطلبات الدورة <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={reqInput}
                    onChange={(e) => setReqInput(e.target.value)}
                    placeholder="مثال: رغبة في التطوير، حاسوب..."
                    className="flex-1 border-gray-200 focus:border-gold"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (reqInput.trim()) {
                          setRequirements([...requirements, reqInput.trim()]);
                          setReqInput("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (reqInput.trim()) {
                        setRequirements([...requirements, reqInput.trim()]);
                        setReqInput("");
                      }
                    }}
                    className="bg-navy text-white hover:bg-navy-dim"
                  >
                    إضافة
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {requirements.map((req, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {req}
                      <button
                        onClick={() =>
                          setRequirements(
                            requirements.filter((_, i) => i !== idx),
                          )
                        }
                        className="text-blue-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
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
                    !courseId
                      ? "bg-blue-100 text-blue-700"
                      : isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {!courseId ? "دورة جديدة" : isPublished ? "منشور" : "مسودة"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">
                  الرؤية
                </span>
                <span className="text-sm text-navy font-medium">
                  {!courseId ? "غير محدد" : isPublished ? "عام" : "خاص"}
                </span>
              </div>
            </div>
            <Button
              onClick={handlePublish}
              disabled={!courseId || isSaving || isLoading}
              variant={isPublished ? "outline" : "gold"}
              className={`w-full font-bold h-11 rounded-xl transition-all gap-2 ${
                isPublished
                  ? "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200"
              } disabled:opacity-50 disabled:grayscale`}
              title={
                !courseId
                  ? "يرجى حفظ الدورة أولاً"
                  : hasChanges()
                    ? "يرجى حفظ التعديلات أولاً"
                    : ""
              }
            >
              {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : !courseId ? (
                <Save size={16} />
              ) : isPublished ? (
                <Eye size={16} />
              ) : (
                <Save size={16} />
              )}
              {!courseId
                ? "حفظ الدورة أولاً"
                : isPublished
                  ? "إلغاء النشر (تحويل لمسودة)"
                  : "نشر الدورة الآن"}
            </Button>
          </div>

          {/* Quick Stats */}
          {courseId && (
            <div className="bg-navy rounded-xl p-6 text-white space-y-4">
              <h3 className="font-bold">إحصائيات سريعة</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-gold">
                    {course?.studentsCount || 0}
                  </div>
                  <div className="text-xs text-gray-300">الطلاب</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-gold">
                    {(() => {
                      const count = course?.studentsCount || 0;
                      const priceData = course?.price;
                      const amount =
                        typeof priceData === "object"
                          ? priceData.amount
                          : priceData || 0;
                      const total = count * amount;
                      const currencySymbol =
                        typeof priceData === "object"
                          ? priceData.currency
                          : "ر.س";
                      return `${total} ${currencySymbol}`;
                    })()}
                  </div>
                  <div className="text-xs text-gray-300">المبيعات</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
