"use client";

import { useStore, Course } from "@/lib/store";
import { Plus, Video, Upload, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";
// import Image from "next/image"; // Not used in the placeholder version, but kept for future

export function DashboardCourses() {
    const { user, courses, addCourse } = useStore();
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [newCourseDetails, setNewCourseDetails] = useState({ title: "", price: "", category: "" });
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return; // Should not happen given parent checks

        // Simulate video upload
        const videoName = videoFile ? videoFile.name : "demo-intro.mp4";

        const newCourse: Course = {
            id: Date.now(),
            slug: newCourseDetails.title.toLowerCase().replace(/ /g, "-"),
            title: newCourseDetails.title,
            category: newCourseDetails.category || "عام",
            description: "دورة جديدة تم إضافتها.",
            price: newCourseDetails.price + " SAR",
            priceValue: Number(newCourseDetails.price),
            image: "/course1.jpg", // Placeholder
            instructor: user.name,
            duration: "5 ساعات",
            rating: 0,
            students: 0,
            sections: [
                {
                    title: "المقدمة",
                    lessons: [{ title: `فيديو: ${videoName}`, duration: "10:00" }]
                }
            ]
        };

        addCourse(newCourse);
        setShowAddCourse(false);
        setVideoFile(null);
        alert("تم إضافة الدورة والفيديو بنجاح ✅");
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionHeader
                title="إدارة المحتوى والدورات"
                action={
                    <Button onClick={() => setShowAddCourse(!showAddCourse)} className="bg-navy text-white gap-2 hover:bg-navy-light">
                        <Plus size={18} /> إضافة دورة جديدة
                    </Button>
                }
            />

            {/* Add Course Form */}
            {showAddCourse && (
                <div className="bg-white p-6 rounded-xl border border-gold/30 shadow-sm mb-6 max-w-3xl">
                    <h3 className="font-bold text-navy mb-4">إنشاء دورة جديدة</h3>
                    <form onSubmit={handleAddCourse} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">عنوان الدورة</label>
                                <input
                                    required
                                    className="w-full p-2 border rounded-lg"
                                    value={newCourseDetails.title}
                                    onChange={e => setNewCourseDetails({ ...newCourseDetails, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">التصنيف</label>
                                <select
                                    className="w-full p-2 border rounded-lg bg-white"
                                    value={newCourseDetails.category}
                                    onChange={e => setNewCourseDetails({ ...newCourseDetails, category: e.target.value })}
                                >
                                    <option value="">اختر التصنيف...</option>
                                    <option value="القيادة">القيادة</option>
                                    <option value="التقنية">التقنية</option>
                                    <option value="المالية">المالية</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">السعر (SAR)</label>
                                <input
                                    required
                                    type="number"
                                    className="w-full p-2 border rounded-lg"
                                    value={newCourseDetails.price}
                                    onChange={e => setNewCourseDetails({ ...newCourseDetails, price: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Video Upload Simulation */}
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="video/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
                            />
                            <div className="flex flex-col items-center gap-2 text-gray-500">
                                {videoFile ? (
                                    <>
                                        <Video size={32} className="text-green-500" />
                                        <p className="font-bold text-green-700">{videoFile.name}</p>
                                        <p className="text-xs">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={32} />
                                        <p className="font-bold">اسحب وأفلت فيديو المقدمة هنا</p>
                                        <p className="text-xs">أو انقر للاختيار من جهازك (MP4, WebM)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                            <Button type="button" variant="outline" onClick={() => setShowAddCourse(false)}>إلغاء</Button>
                            <Button type="submit" className="bg-gold text-navy font-bold">نشر الدورة</Button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden flex flex-col group">
                        <div className="h-40 bg-gray-200 relative">
                            {/* This would be Next/Image */}
                            {/* <Image src={course.image} alt={course.title} fill className="object-cover" /> */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                                <BookOpen size={32} />
                            </div>
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-navy">
                                {course.category}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h4 className="font-bold text-navy mb-2 line-clamp-1">{course.title}</h4>
                            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                                <span className="font-bold text-gold">{course.price}</span>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded text-gray-500"><FileText size={16} /></button>
                                    <button className="p-2 hover:bg-gray-100 rounded text-gray-500"><Video size={16} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
