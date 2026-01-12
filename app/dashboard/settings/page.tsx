"use client";

import { Button } from "@/components/ui/button";
import { Settings, Globe, Mail, CreditCard, Bell, Save, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-navy">الإعدادات</h1>
                <p className="text-gray-500 mt-1">إدارة إعدادات المنصة</p>
            </div>

            {/* General Settings */}
            <div className="bg-white rounded-xl border border-gray-100  p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gold/10 rounded-lg">
                        <Globe size={20} className="text-gold" />
                    </div>
                    <div>
                        <h2 className="font-bold text-navy">إعدادات عامة</h2>
                        <p className="text-sm text-gray-500">معلومات المنصة الأساسية</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">اسم المنصة</label>
                        <input
                            type="text"
                            defaultValue="منصة الحبسي التعليمية"
                            className="w-full h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">عنوان الموقع</label>
                        <input
                            type="url"
                            defaultValue="https://alhabsi.com"
                            className="w-full h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                            dir="ltr"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-navy">وصف المنصة</label>
                        <textarea
                            defaultValue="منصة تعليمية متخصصة في التطوير الشخصي والقيادة"
                            className="w-full h-24 px-4 py-3 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Email Settings */}
            <div className="bg-white rounded-xl border border-gray-100  p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Mail size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-navy">إعدادات البريد الإلكتروني</h2>
                        <p className="text-sm text-gray-500">إعدادات SMTP للإشعارات</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">خادم SMTP</label>
                        <input
                            type="text"
                            placeholder="smtp.example.com"
                            className="w-full h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                            dir="ltr"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">المنفذ</label>
                        <input
                            type="number"
                            placeholder="587"
                            className="w-full h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">اسم المستخدم</label>
                        <input
                            type="text"
                            placeholder="noreply@example.com"
                            className="w-full h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                            dir="ltr"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy">كلمة المرور</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CreditCard size={20} className="text-green-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-navy">إعدادات الدفع</h2>
                        <p className="text-sm text-gray-500">بوابات الدفع المتاحة</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center border border-gray-200">
                                <span className="font-bold text-xs text-blue-600">PP</span>
                            </div>
                            <div>
                                <p className="font-medium text-navy text-sm">PayPal</p>
                                <p className="text-xs text-gray-400">غير مفعل</p>
                            </div>
                        </div>
                        <button className="text-xs text-gold font-bold hover:underline">تفعيل</button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-navy rounded flex items-center justify-center">
                                <span className="font-bold text-xs text-white">ST</span>
                            </div>
                            <div>
                                <p className="font-medium text-navy text-sm">Stripe</p>
                                <p className="text-xs text-green-500">مفعل</p>
                            </div>
                        </div>
                        <button className="text-xs text-red-500 font-bold hover:underline">إلغاء</button>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-xl border border-gray-100  p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Bell size={20} className="text-purple-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-navy">إعدادات الإشعارات</h2>
                        <p className="text-sm text-gray-500">التحكم في الإشعارات</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-navy text-sm">إشعارات البريد للتسجيلات الجديدة</p>
                            <p className="text-xs text-gray-400">استلام بريد عند تسجيل طالب جديد</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-gold" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-navy text-sm">إشعارات المبيعات</p>
                            <p className="text-xs text-gray-400">استلام بريد عند إتمام عملية شراء</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-gold" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-navy text-sm">تقرير أسبوعي</p>
                            <p className="text-xs text-gray-400">استلام تقرير أداء أسبوعي</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-gold" />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button className="gap-2 bg-gold hover:bg-gold-dim text-navy font-bold px-8">
                    <Save size={16} />
                    حفظ جميع الإعدادات
                </Button>
            </div>
        </div>
    );
}
