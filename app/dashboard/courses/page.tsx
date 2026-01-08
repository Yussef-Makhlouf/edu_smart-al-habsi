"use client";

import { useState } from "react";
import { CourseBuilder } from "@/components/dashboard/CourseBuilder";
import { FileUploadSection } from "@/components/dashboard/FileUploadSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Save, Eye, Settings2 } from "lucide-react";

export default function CoursesPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [activeTab, setActiveTab] = useState<"content" | "files" | "settings">("content");

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-navy">إدارة الدورات</h1>
                    <p className="text-gray-500 mt-1">قم بإنشاء وتعديل الدورات التدريبية الخاصة بك.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-navy/20 text-navy hover:bg-navy/5">
                        <Eye size={16} />
                        معاينة
                    </Button>
                    <Button className="gap-2 bg-gold hover:bg-gold-dim text-navy font-bold">
                        <Save size={16} />
                        حفظ الدورة
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-gray-200 pb-0">
                <button
                    onClick={() => setActiveTab("content")}
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === "content" ? "border-gold text-navy" : "border-transparent text-gray-400 hover:text-navy"}`}
                >
                    المحتوى والأقسام
                </button>
                <button
                    onClick={() => setActiveTab("files")}
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === "files" ? "border-gold text-navy" : "border-transparent text-gray-400 hover:text-navy"}`}
                >
                    الملفات والمرفقات
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === "settings" ? "border-gold text-navy" : "border-transparent text-gray-400 hover:text-navy"}`}
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
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-navy font-bold">عنوان الدورة</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="مثال: أسرار القيادة الاستراتيجية"
                                        className="font-bold text-lg border-gray-200 focus:border-gold focus:ring-gold/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-navy font-bold">وصف الدورة</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="اكتب وصفاً مختصراً للدورة..."
                                        className="min-h-[120px] border-gray-200 focus:border-gold focus:ring-gold/20"
                                    />
                                </div>
                            </div>

                            {/* Course Builder (Sections & Lessons) */}
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <CourseBuilder />
                            </div>
                        </>
                    )}

                    {activeTab === "files" && (
                        <FileUploadSection />
                    )}

                    {activeTab === "settings" && (
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
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
                                        />
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ر.س</span>
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
                                    <button className="flex-1 p-3 rounded-lg border-2 border-gold bg-gold/5 text-navy font-medium text-sm">مبتدئ</button>
                                    <button className="flex-1 p-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gold hover:bg-gold/5 transition-colors text-sm">متوسط</button>
                                    <button className="flex-1 p-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gold hover:bg-gold/5 transition-colors text-sm">متقدم</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Course Image */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-bold text-navy">صورة الدورة</h3>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg h-48 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gold/50 transition-colors cursor-pointer group">
                            <ImagePlus size={32} className="mb-2 group-hover:text-gold transition-colors" />
                            <span className="text-sm">اضغط لرفع صورة</span>
                        </div>
                    </div>

                    {/* Publish Settings */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-bold text-navy">إعدادات النشر</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-600">الحالة</span>
                                <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded-full">مسودة</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm font-medium text-gray-600">الرؤية</span>
                                <span className="text-sm text-navy font-medium">خاص</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 font-bold">
                            نشر الدورة
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
