"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Search, Mail, BookOpen, MoreVertical, Eye, Trash2 } from "lucide-react";

interface Student {
    id: string;
    name: string;
    email: string;
    courses: number;
    joinDate: string;
    status: "active" | "inactive";
}

const mockStudents: Student[] = [
    { id: "1", name: "أحمد محمد", email: "ahmed@gmail.com", courses: 3, joinDate: "2024-01-15", status: "active" },
    { id: "2", name: "سارة علي", email: "sara@gmail.com", courses: 2, joinDate: "2024-02-10", status: "active" },
    { id: "3", name: "خالد عمر", email: "khaled@gmail.com", courses: 1, joinDate: "2024-03-05", status: "inactive" },
    { id: "4", name: "فاطمة أحمد", email: "fatma@gmail.com", courses: 4, joinDate: "2024-01-20", status: "active" },
    { id: "5", name: "عبدالله سالم", email: "abdullah@gmail.com", courses: 2, joinDate: "2024-02-28", status: "active" },
];

export default function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [students] = useState<Student[]>(mockStudents);

    const filteredStudents = students.filter(s =>
        s.name.includes(searchQuery) || s.email.includes(searchQuery)
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-navy">إدارة الطلاب</h1>
                    <p className="text-gray-500 mt-1">عرض وإدارة الطلاب المسجلين</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="البحث عن طالب..."
                            className="h-10 pr-10 pl-4 rounded-lg border border-gray-200 focus:border-gold focus:ring-1 focus:ring-gold/20 text-sm w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                            <Users size={20} className="text-gold" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-navy">{students.length}</p>
                            <p className="text-sm text-gray-500">إجمالي الطلاب</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Users size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-navy">{students.filter(s => s.status === "active").length}</p>
                            <p className="text-sm text-gray-500">طلاب نشطين</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 ">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <BookOpen size={20} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-navy">{students.reduce((acc, s) => acc + s.courses, 0)}</p>
                            <p className="text-sm text-gray-500">إجمالي التسجيلات</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-right px-6 py-4 text-sm font-bold text-navy">الطالب</th>
                            <th className="text-right px-6 py-4 text-sm font-bold text-navy">البريد الإلكتروني</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">الدورات</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">تاريخ التسجيل</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">الحالة</th>
                            <th className="text-center px-6 py-4 text-sm font-bold text-navy">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {student.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-navy">{student.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-500 text-sm" dir="ltr">{student.email}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-bold">
                                        {student.courses}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-500">
                                    {new Date(student.joinDate).toLocaleDateString('ar-SA')}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.status === "active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {student.status === "active" ? "نشط" : "غير نشط"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-lg transition-colors">
                                            <Eye size={16} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Mail size={16} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredStudents.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <Users size={40} className="mx-auto mb-3 opacity-50" />
                        <p>لا يوجد طلاب مطابقين للبحث</p>
                    </div>
                )}
            </div>
        </div>
    );
}
