"use client";

import { useStore, User } from "@/lib/store";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";

export function DashboardStudents() {
    const { users, addStudent } = useStore();
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [newStudentEmail, setNewStudentEmail] = useState("");
    const [newStudentName, setNewStudentName] = useState("");

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        const newStudent: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: newStudentName,
            email: newStudentEmail,
            role: "student"
        };
        addStudent(newStudent);
        setShowAddStudent(false);
        setNewStudentName("");
        setNewStudentEmail("");
        alert("تم إضافة الطالب بنجاح ✅");
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionHeader
                title="إدارة الطلاب"
                action={
                    <Button onClick={() => setShowAddStudent(!showAddStudent)} className="bg-navy text-white gap-2 hover:bg-navy-light">
                        <Plus size={18} /> إضافة طالب جديد
                    </Button>
                }
            />

            {/* Add Student Form */}
            {showAddStudent && (
                <div className="bg-white p-6 rounded-xl border border-gold/30 shadow-sm mb-6 max-w-2xl">
                    <h3 className="font-bold text-navy mb-4">بيانات الطالب الجديد</h3>
                    <form onSubmit={handleAddStudent} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">الاسم الكامل</label>
                                <input
                                    required
                                    className="w-full p-2 border rounded-lg"
                                    value={newStudentName}
                                    onChange={e => setNewStudentName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">البريد الإلكتروني</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full p-2 border rounded-lg"
                                    value={newStudentEmail}
                                    onChange={e => setNewStudentEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddStudent(false)}>إلغاء</Button>
                            <Button type="submit" className="bg-gold text-navy font-bold">حفظ وإرسال الدعوة</Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search Mock */}
            <div className="relative max-w-md mb-6">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200" placeholder="بحث عن طالب..." />
            </div>

            {/* Student List */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                        <tr>
                            <th className="p-4 font-medium">اسم الطالب</th>
                            <th className="p-4 font-medium">البريد الإلكتروني</th>
                            <th className="p-4 font-medium">تاريخ الانضمام</th>
                            <th className="p-4 font-medium">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.filter(u => u.role === "student").map(student => (
                            <tr key={student.id} className="hover:bg-gray-50/50">
                                <td className="p-4 font-bold text-navy">{student.name}</td>
                                <td className="p-4 text-gray-500">{student.email}</td>
                                <td className="p-4 text-gray-500">2024-05-01</td>
                                <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">نشط</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
