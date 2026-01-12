"use client";

import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Save } from "lucide-react";
import { useStore } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileSidebar } from "@/components/ProfileSidebar";

export default function StudentProfilePage() {
  const { user } = useStore();

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#DAA520]/30 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            الملف الشخصي
          </h1>
          <p className="text-white/90 text-lg font-medium">
            أهلا بك، {user?.name || "محمد"}. قم بإدارة بياناتك ومسارك التعليمي.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row-reverse gap-8 items-start relative z-20">
        {/* Content (Left Side in RTL) */}
        <div className="flex-1 space-y-8 w-full order-2 lg:order-1">
          {/* Personal Info */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <User size={20} className="text-gold" />
              البطاقة الشخصية
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy">
                    الاسم الأول
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name ? user.name.split(" ")[0] : "محمد"}
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 bg-gray-50/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy">
                    اسم العائلة
                  </label>
                  <input
                    type="text"
                    defaultValue={
                      user?.name && user.name.split(" ").length > 1
                        ? user.name.split(" ")[1]
                        : "علي"
                    }
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 bg-gray-50/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    defaultValue={user?.email || "mohammed@example.com"}
                    className="w-full h-11 pr-10 pl-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                    readOnly
                    dir="ltr"
                  />
                </div>
                <p className="text-xs text-gray-400 mr-1">
                  لا يمكن تغيير البريد الإلكتروني المسجل.
                </p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h3 className="font-bold text-navy text-lg mb-6 flex items-center gap-2">
              <Lock size={20} className="text-gold" />
              الأمان وكلمة المرور
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-navy">
                  كلمة المرور الحالية
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy">
                    كلمة المرور الجديدة
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy">
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4">
            <Button className="h-12 px-8 bg-gold hover:bg-gold-dim text-navy font-bold text-base transition-all gap-2">
              <Save size={18} />
              حفظ التغييرات
            </Button>
          </div>
        </div>

        {/* Sidebar (Right Side in RTL) */}
        <aside className="w-full lg:w-[280px] flex-shrink-0 order-1 lg:order-2">
          <ProfileSidebar />
        </aside>
      </div>

      <Footer />
    </div>
  );
}
