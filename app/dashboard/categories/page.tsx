"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/lib/api/categories/categoriesApi";
import { ConfirmModal } from "@/components/dashboard/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoriesPage() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCategories = categories?.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setCurrentCategory(null);
    setNewCategoryName("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: any) => {
    setCurrentCategory({ id: category._id, name: category.name });
    setNewCategoryName(category.name);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setIsSubmitting(true);
    try {
      if (currentCategory) {
        await updateCategory({
          id: currentCategory.id,
          data: { name: newCategoryName },
        }).unwrap();
        toast.success("تم تحديث الفئة بنجاح");
      } else {
        await createCategory({ name: newCategoryName }).unwrap();
        toast.success("تم إنشاء الفئة بنجاح");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "حدث خطأ ما");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!currentCategory) return;
    setIsSubmitting(true);
    try {
      await deleteCategory(currentCategory.id).unwrap();
      toast.success("تم حذف الفئة بنجاح");
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "حدث خطأ ما");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">التصنيفات</h1>
          <p className="text-gray-500 text-sm mt-1">
            إدارة تصنيفات الدورات في المنصة
          </p>
        </div>
        <Button
          onClick={handleOpenCreateModal}
          className="bg-gold hover:bg-gold-dim text-navy font-bold gap-2"
        >
          <Plus size={18} />
          إضافة تصنيف جديد
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="البحث عن تصنيف..."
            className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={40} />
        </div>
      ) : filteredCategories && filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div
                key={category._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-gold/10 transition-colors" />

                <div className="flex items-start justify-between relative z-10">
                  <div className="p-3 bg-navy/5 rounded-xl group-hover:bg-gold/20 transition-colors">
                    <FolderOpen
                      className="text-navy group-hover:text-gold"
                      size={24}
                    />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenEditModal(category)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentCategory({
                          id: category._id,
                          name: category.name,
                        });
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 relative z-10">
                  <h3 className="font-bold text-navy text-lg group-hover:text-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">
                    {category.slug}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 bg-white/50 relative z-10">
                  <span>
                    أُنشئت في{" "}
                    {new Date(category.createdAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="bg-white py-20 rounded-2xl border-2 border-dashed border-gray-100 text-center">
          <FolderOpen size={48} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-gray-500 font-medium">لم يتم العثور على تصنيفات</h3>
          <p className="text-gray-400 text-sm mt-1">
            ابدأ بإضافة أول تصنيفذ للمنصة
          </p>
          <Button
            onClick={handleOpenCreateModal}
            variant="outline"
            className="mt-6 border-gold text-gold hover:bg-gold hover:text-navy"
          >
            إضافة تصنيف جديدة
          </Button>
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-xl font-bold text-navy mb-4">
                {currentCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم التصنيف
                  </label>
                  <input  
                    type="text"
                    required
                    autoFocus
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="مثل: برمجة، تصميم، لغات..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gold hover:bg-gold-dim text-navy font-bold"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : currentCategory ? (
                      "حفظ التغييرات"
                    ) : (
                      "إضافة التصنيف"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isSubmitting}
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 text-gray-500"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => !isSubmitting && setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="حذف الفئة"
        description={`هل أنت متأكد من حذف فئة "${currentCategory?.name}"؟ قد يؤثر ذلك على الدورات المرتبطة بها.`}
        confirmText="نعم، احذف الفئة"
        cancelText="إلغاء"
        isLoading={isSubmitting}
        variant="danger"
      />
    </div>
  );
}
