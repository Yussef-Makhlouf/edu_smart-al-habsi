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
import { useStore } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { useProfile } from "@/lib/hooks/useProfile";
import { Toaster } from "@/components/ui/sonner";

export default function StudentProfilePage() {
  const { user } = useStore();
  const {
    form,
    onSubmit,
    isLoading,
    isFetching,
    error,
    success,
    profileImage,
    handleImageChange,
    getInitial,
  } = useProfile();

  // Get user name for display
  const userName = user?.name || form.watch("userName") || "";

  return (
    <div
      className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans"
      dir="rtl"
    >
      <div className="absolute top-0 w-full z-50">
        <Navbar lightVariant={false} />
      </div>

      {/* Hero Section */}
      <section className="bg-navy relative w-full h-[55vh] flex items-center justify-center pt-32 pb-24 overflow-hidden text-center z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#DAA520]/30 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            الملف الشخصي
          </h1>
          <p className="text-white/90 text-lg font-medium">
            أهلا بك، {userName || "محمد"}. قم بإدارة بياناتك ومسارك التعليمي.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row-reverse gap-8 items-start relative z-20">
        {/* Content (Left Side in RTL) */}
        <div className="flex-1 space-y-8 w-full order-2 lg:order-1">
          {/* Success/Error Messages */}
          {success && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm text-right">
              {success}
            </div>
          )}
          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm text-right">
              {error}
            </div>
          )}

          {/* Personal Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <User size={20} className="text-gold" />
              البطاقة الشخصية
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    {profileImage ? (
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gold/20">
                        <img
                          src={profileImage}
                          alt={userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-navy flex items-center justify-center text-4xl text-gold font-bold border-4 border-gold/20">
                        {getInitial(userName)}
                      </div>
                    )}
                    <label
                      htmlFor="image-upload"
                      className={`absolute bottom-0 left-0 bg-gold p-2 rounded-full text-navy cursor-pointer group-hover:scale-110 transition-transform shadow-lg ${isLoading || isFetching ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                  <p className="text-xs text-gray-500 mt-2 text-center">
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
                          <div className="relative">
                            <User
                              size={18}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <Input
                              {...field}
                              className="w-full h-11 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 bg-gray-50/50"
                              disabled={isLoading || isFetching}
                            />
                          </div>
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
                          <div className="relative">
                            <Mail
                              size={18}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <Input
                              {...field}
                              type="email"
                              className="w-full h-11 pr-10 pl-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                              readOnly
                              dir="ltr"
                              disabled
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-right" />
                        <p className="text-xs text-gray-400 mr-1">
                          لا يمكن تغيير البريد الإلكتروني المسجل.
                        </p>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Security Section */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
                    <Lock size={20} className="text-gold" />
                    تغيير كلمة المرور 
                  </h3>
                  <div className="space-y-4">
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
                              className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20"
                              disabled={isLoading || isFetching}
                            />
                          </FormControl>
                          <FormMessage className="text-right" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || isFetching}
                    className="h-12 px-8 bg-gold hover:bg-gold-dim text-navy font-bold text-base transition-all gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </div>

        {/* Sidebar (Right Side in RTL) */}
        <aside className="w-full lg:w-[280px] shrink-0 order-1 lg:order-2">
          <ProfileSidebar />
        </aside>
      </div>

      <Footer />
      <Toaster position="top-center" dir="rtl" />
    </div>
  );
}
