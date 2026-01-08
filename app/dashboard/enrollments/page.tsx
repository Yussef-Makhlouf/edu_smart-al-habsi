"use client";

import { useState } from "react";
import { CreditCard, Search, Eye, CheckCircle, Clock, XCircle } from "lucide-react";

interface Enrollment {
    id: string;
    studentName: string;
    courseName: string;
    price: number;
    date: string;
    status: "active" | "completed" | "pending" | "cancelled";
}

const mockEnrollments: Enrollment[] = [
    { id: "1", studentName: "أحمد محمد", courseName: "أسرار القيادة الاستراتيجية", price: 199, date: "2024-01-15", status: "active" },
    { id: "2", studentName: "سارة علي", courseName: "فن التواصل الفعال", price: 149, date: "2024-02-10", status: "completed" },
    { id: "3", studentName: "خالد عمر", courseName: "أسرار القيادة الاستراتيجية", price: 199, date: "2024-03-05", status: "pending" },
    { id: "4", studentName: "فاطمة أحمد", courseName: "ريادة الأعمال من الصفر", price: 299, date: "2024-01-20", status: "active" },
    { id: "5", studentName: "عبدالله سالم", courseName: "فن التواصل الفعال", price: 149, date: "2024-02-28", status: "cancelled" },
    { id: "6", studentName: "مريم سعيد", courseName: "أسرار القيادة الاستراتيجية", price: 199, date: "2024-03-10", status: "active" },
];

const statusConfig = {
    active: { label: "نشط", color: "bg-green-100 text-green-600", icon: CheckCircle },
    completed: { label: "مكتمل", color: "bg-blue-100 text-blue-600", icon: CheckCircle },
    pending: { label: "معلق", color: "bg-amber-100 text-amber-600", icon: Clock },
    cancelled: { label: "ملغي", color: "bg-red-100 text-red-600", icon: XCircle },
};

export default function EnrollmentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [enrollments] = useState<Enrollment[]>(mockEnrollments);

    const filteredEnrollments = enrollments.filter(e => {
        const matchesSearch = e.studentName.includes(searchQuery) || e.courseName.includes(searchQuery);
        const matchesStatus = statusFilter === "all" || e.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = enrollments.filter(e => e.status !== "cancelled").reduce((acc, e) => acc + e.price, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-navy">الاشتراكات</h1>
                    <p className="text-gray-500 mt-1">إدارة اشتراكات الطلاب في الدورات</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">إجمالي الاشتراكات</p>
                    <p className="text-2xl font-bold text-navy">{enrollments.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">الاشتراكات النشطة</p>
                    <p className="text-2xl font-bold text-green-600">{enrollments.filter(e => e.status === "active").length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">المكتملة</p>
                    <p className="text-2xl font-bold text-blue-600">{enrollments.filter(e => e.status === "completed").length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold text-gold">{totalRevenue} ر.س</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
                <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="البحث عن طالب أو دورة..."
                        className="w-full h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-10 px-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm"
                >
                    <option value="all">جميع الحالات</option>
                    <option value="active">نشط</option>
                    <option value="completed">مكتمل</option>
                    <option value="pending">معلق</option>
                    <option value="cancelled">ملغي</option>
                </select>
            </div>

            {/* Enrollments Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-right px-6 py-4 text-sm font-bold text-navy">الطالب</th>
                            <th className="text-right px-6 py-4 text-sm font-bold text-navy">الدورة</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">السعر</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">التاريخ</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">الحالة</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">تفاصيل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEnrollments.map((enrollment) => {
                            const StatusIcon = statusConfig[enrollment.status].icon;
                            return (
                                <tr key={enrollment.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                {enrollment.studentName.charAt(0)}
                                            </div>
                                            <span className="font-medium text-navy">{enrollment.studentName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600 text-sm">{enrollment.courseName}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-navy">{enrollment.price} ر.س</span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        {new Date(enrollment.date).toLocaleDateString('ar-SA')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusConfig[enrollment.status].color}`}>
                                            <StatusIcon size={12} />
                                            {statusConfig[enrollment.status].label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors">
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {filteredEnrollments.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <CreditCard size={40} className="mx-auto mb-3 opacity-50" />
                        <p>لا يوجد اشتراكات مطابقة للبحث</p>
                    </div>
                )}
            </div>
        </div>
    );
}
