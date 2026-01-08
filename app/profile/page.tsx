import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Award,
  Clock,
  BookOpen,
} from "lucide-react";

export default function StudentProfilePage() {
  return (
    <main className="bg-paper min-h-screen flex flex-col">
      <Navbar lightVariant={true} />

      <div className="flex-1 container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Text */}
          <div>
            <h1 className="text-3xl font-bold text-navy">حسابي الشخصي</h1>
            <p className="text-gray-500 mt-1">
              أهلاً بك، محمد. قم بإدارة بياناتك ومسارك التعليمي.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar: Profile Card & Stats */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <div className="w-32 h-32 rounded-full bg-navy flex items-center justify-center text-4xl text-gold font-bold border-4 border-white shadow-lg relative overflow-hidden">
                    {/* Placeholder for user image */}
                    <span className="z-10">م</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-navy-dark to-navy"></div>
                  </div>
                  <button className="absolute bottom-1 right-1 bg-gold p-2 rounded-full text-navy shadow-md hover:scale-110 transition-transform">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-navy">محمد علي</h2>
                <p className="text-gray-500 text-sm mb-4">طالب شغوف</p>
                <div className="flex gap-2 text-xs bg-navy/5 px-3 py-1 rounded-full text-navy font-medium">
                  <span>عضو منذ:</span>
                  <span>يناير 2024</span>
                </div>
              </div>

              {/* Mini Stats */}
              <div className="bg-navy rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h3 className="font-bold mb-4 border-b border-white/10 pb-2">
                  إنجازاتي
                </h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-300 text-sm">
                      <BookOpen size={16} className="text-gold" /> الدورات
                      المكتملة
                    </span>
                    <span className="font-bold text-xl">2</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-300 text-sm">
                      <Award size={16} className="text-gold" /> الشهادات
                    </span>
                    <span className="font-bold text-xl">1</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-gray-300 text-sm">
                      <Clock size={16} className="text-gold" /> ساعات التعلم
                    </span>
                    <span className="font-bold text-xl">15</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Content: Edit Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
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
                        defaultValue="محمد"
                        className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 bg-gray-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">
                        اسم العائلة
                      </label>
                      <input
                        type="text"
                        defaultValue="علي"
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
                        defaultValue="mohammed@example.com"
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
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
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
                <Button className="h-12 px-8 bg-gold hover:bg-gold-dim text-navy font-bold text-base shadow-md hover:shadow-lg transition-all gap-2">
                  <Save size={18} />
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
