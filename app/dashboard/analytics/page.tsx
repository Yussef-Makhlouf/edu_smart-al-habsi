"use client";

import { BarChart3, Users, BookOpen, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-navy">الإحصائيات</h1>
                <p className="text-gray-500 mt-1">متابعة أداء المنصة والتحليلات</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                            <DollarSign size={20} className="text-gold" />
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                            <ArrowUpRight size={14} />
                            +12%
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-navy">15,450 ر.س</p>
                    <p className="text-sm text-gray-500">إجمالي الإيرادات</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users size={20} className="text-blue-600" />
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                            <ArrowUpRight size={14} />
                            +8%
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-navy">127</p>
                    <p className="text-sm text-gray-500">إجمالي الطلاب</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <BookOpen size={20} className="text-green-600" />
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-green-500">
                            <ArrowUpRight size={14} />
                            +2
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-navy">8</p>
                    <p className="text-sm text-gray-500">الدورات المنشورة</p>
                </div>

                {/* <div className="bg-white p-6 rounded-xl border border-gray-100 ">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <TrendingUp size={20} className="text-purple-600" />
                        </div>
                        <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                            <ArrowDownRight size={14} />
                            -3%
                        </span>
                    </div>
                    <p className="text-2xl font-bold text-navy">82%</p>
                    <p className="text-sm text-gray-500">معدل الإكمال</p>
                </div> */}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                {/* <div className="bg-white p-6 rounded-xl border border-gray-100 ">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-navy">الإيرادات الشهرية</h3>
                        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
                            <option>آخر 6 أشهر</option>
                            <option>آخر سنة</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end gap-4 justify-between px-4">
                        {[65, 45, 80, 55, 90, 70].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-gold to-gold/60 rounded-t-lg transition-all hover:from-gold-dim hover:to-gold/80"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-xs text-gray-400">
                                    {["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Students Growth Chart */}
                {/* <div className="bg-white p-6 rounded-xl border border-gray-100 ">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-navy">نمو الطلاب</h3>
                        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
                            <option>آخر 6 أشهر</option>
                            <option>آخر سنة</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end gap-4 justify-between px-4">
                        {[40, 55, 45, 70, 85, 95].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-navy to-navy/60 rounded-t-lg transition-all hover:from-navy/90 hover:to-navy/70"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-xs text-gray-400">
                                    {["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>

            {/* Popular Courses */}
            <div className="bg-white rounded-xl border border-gray-100  overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-navy">الدورات الأكثر شعبية</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {[
                        { name: "أسرار القيادة الاستراتيجية", students: 45, revenue: 8955 },
                        { name: "ريادة الأعمال من الصفر", students: 38, revenue: 11362 },
                        { name: "فن التواصل الفعال", students: 32, revenue: 4768 },
                        { name: "إدارة الوقت والإنتاجية", students: 28, revenue: 4172 },
                    ].map((course, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                                    {i + 1}
                                </span>
                                <div>
                                    <p className="font-medium text-navy">{course.name}</p>
                                    <p className="text-sm text-gray-400">{course.students} طالب</p>
                                </div>
                            </div>
                            <span className="font-bold text-gold">{course.revenue} ر.س</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
