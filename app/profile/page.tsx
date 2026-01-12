"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Mail, Lock, Save, Camera, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { useProfile } from "@/lib/hooks/useProfile";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    form,
    onSubmit,
    isLoading,
    isFetching,
    isDirty,
    error,
    success,
    profileImage,
    handleImageChange,
    getInitial,
  } = useProfile();

  const userName = user?.name || form.watch("userName") || "";

  return (
    <div className="min-h-screen bg-paper flex flex-col" dir="rtl">
      <div className="absolute top-0 w-full z-50">
        <Navbar lightVariant={false} />
      </div>

      {/* Hero Section - Creative Design */}
      <section className="relative pt-40 pb-20 bg-navy overflow-hidden">
        {/* Diagonal split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute top-0 right-0 w-2/3 h-full bg-navy-dark"
            style={{ clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
        </div>

        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)",
          }}
        />

        {/* Large decorative text */}
        <div className="absolute bottom-0 right-0 pointer-events-none select-none">
          <span className="text-[160px] font-bold text-white/[0.02] leading-none">
            الملف
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 bg-gold" />
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-sm font-bold tracking-widest uppercase">
                إدارة الحساب
              </span>
            </div>

            {isFetching ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-48 bg-white/10" />
                <Skeleton className="h-6 w-72 bg-white/5" />
              </div>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  الملف <span className="text-gold">الشخصي</span>
                </h1>
                <p className="text-white/70 text-lg">
                  أهلا بك، {userName || "محمد"}. قم بإدارة بياناتك ومسارك
                  التعليمي.
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* Corner decorative elements */}
        <div className="absolute bottom-10 left-10 w-px h-16 bg-gradient-to-t from-gold/50 to-transparent" />
        <div className="absolute bottom-10 left-10 w-16 h-px bg-gradient-to-r from-gold/50 to-transparent" />
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row-reverse gap-8 items-start relative z-20">
        {/* Content */}
        <div className="flex-1 space-y-8 w-full order-2 lg:order-1">
          {/* Success/Error Messages */}
          {success && (
            <div className="p-4 bg-green-50 border-r-2 border-green-500 text-green-700 text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 border-r-2 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Personal Info Card */}
          <motion.div
            className="relative bg-white border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-gold border-r-[40px] border-r-transparent z-10" />

            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-navy flex items-center justify-center">
                  <User size={18} className="text-gold" />
                </div>
                <h3 className="font-bold text-navy text-lg">البطاقة الشخصية</h3>
              </div>

              {isFetching ? (
                <div className="space-y-8">
                  <div className="flex flex-col items-center">
                    <Skeleton className="w-28 h-28 rounded-none border-4 border-gold/20" />
                    <Skeleton className="h-4 w-32 mt-4" />
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative group">
                        {profileImage ? (
                          <div className="w-28 h-28 overflow-hidden border-4 border-gold/20">
                            <img
                              src={profileImage}
                              alt={userName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-28 h-28 bg-navy flex items-center justify-center text-4xl text-gold font-bold border-4 border-gold/20">
                            {getInitial(userName)}
                          </div>
                        )}
                        <label
                          htmlFor="image-upload"
                          className={`absolute -bottom-2 -left-2 bg-gold p-2.5 text-navy cursor-pointer group-hover:scale-110 transition-transform ${
                            isLoading || isFetching
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <Camera size={16} />
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            disabled={isLoading || isFetching}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        اضغط على أيقونة الكاميرا لرفع صورة
                      </p>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-navy">
                              اسم المستخدم
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="w-full h-12 px-4 border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold bg-gray-50"
                                disabled={isLoading || isFetching}
                              />
                            </FormControl>
                            <FormMessage className="text-right" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-navy">
                              البريد الإلكتروني
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="w-full h-12 px-4 border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                                readOnly
                                dir="ltr"
                                disabled
                              />
                            </FormControl>
                            <p className="text-xs text-gray-400 mr-1">
                              لا يمكن تغيير البريد الإلكتروني المسجل.
                            </p>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Security Section */}
                    <div className="pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-navy flex items-center justify-center">
                          <Lock size={18} className="text-gold" />
                        </div>
                        <h3 className="font-bold text-navy text-lg">
                          تغيير كلمة المرور
                        </h3>
                      </div>

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-bold text-navy">
                              كلمة المرور الجديدة
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                placeholder="اتركه فارغاً إذا لم ترد تغيير كلمة المرور"
                                className="w-full h-12 px-4 border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold"
                                disabled={isLoading || isFetching}
                              />
                            </FormControl>
                            <FormMessage className="text-right" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading || isFetching || !isDirty}
                        className="h-12 px-8 bg-gold hover:bg-gold-dim text-navy font-bold gap-2 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            جاري الحفظ...
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            حفظ التغييرات
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[280px] shrink-0 order-1 lg:order-2">
          <ProfileSidebar />
        </aside>
      </div>

      <Footer />
      <Toaster position="top-center" dir="rtl" />
    </div>
  );
}
