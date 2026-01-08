import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Camera, Save } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-navy">الملف الشخصي</h1>
                <p className="text-gray-500 mt-1">إدارة معلوماتك الشخصية</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Avatar Section */}
                <div className="bg-navy/5 p-8 flex flex-col items-center">
                    <div className="relative group">
                        <div className="w-28 h-28 rounded-full bg-navy flex items-center justify-center text-4xl text-gold font-bold">
                            م
                        </div>
                        <button className="absolute bottom-0 left-0 bg-gold p-2 rounded-full text-navy shadow-lg group-hover:scale-110 transition-transform">
                            <Camera size={16} />
                        </button>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-navy">محمد الحبسي</h2>
                    <p className="text-gray-500 text-sm">مدير النظام</p>
                </div>

                {/* Form Section */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy">الاسم الكامل</label>
                            <div className="relative">
                                <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    defaultValue="محمد الحبسي"
                                    className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    defaultValue="admin@alhabsi.com"
                                    className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <h3 className="font-bold text-navy mb-4">تغيير كلمة المرور</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy">كلمة المرور الحالية</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy">كلمة المرور الجديدة</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button className="gap-2 bg-gold hover:bg-gold-dim text-navy font-bold">
                            <Save size={16} />
                            حفظ التغييرات
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
