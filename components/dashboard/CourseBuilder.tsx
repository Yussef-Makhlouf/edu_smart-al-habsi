"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight, Video, Clock, Link2, Play, Upload } from "lucide-react";
import { VideoPreviewModal } from "./VideoPreviewModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Types for our course structure
export interface Section {
    id: string;
    title: string;
    videoCount: number;
    lessons: Lesson[];
    isOpen?: boolean;
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    videoUrl: string;
}

export function CourseBuilder() {
    const [sections, setSections] = useState<Section[]>([
        { id: "1", title: "مقدمة الدورة", videoCount: 3, lessons: [], isOpen: true }
    ]);
    const [videoPreview, setVideoPreview] = useState<{ isOpen: boolean; url: string; title: string }>({
        isOpen: false,
        url: "",
        title: ""
    });

    const addSection = () => {
        const newSection: Section = {
            id: Math.random().toString(36).substr(2, 9),
            title: "قسم جديد",
            videoCount: 0,
            lessons: [],
            isOpen: true
        };
        setSections([...sections, newSection]);
    };

    const removeSection = (id: string) => {
        setSections(sections.filter(s => s.id !== id));
    };

    const updateSectionTitle = (id: string, title: string) => {
        setSections(sections.map(s => s.id === id ? { ...s, title } : s));
    };

    const updateSectionVideoCount = (id: string, videoCount: number) => {
        setSections(sections.map(s => s.id === id ? { ...s, videoCount: Math.max(0, videoCount) } : s));
    };

    const toggleSection = (id: string) => {
        setSections(sections.map(s => s.id === id ? { ...s, isOpen: !s.isOpen } : s));
    };

    const addLesson = (sectionId: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    lessons: [...s.lessons, {
                        id: Math.random().toString(36).substr(2, 9),
                        title: "درس جديد",
                        duration: "00:00",
                        videoUrl: ""
                    }]
                };
            }
            return s;
        }));
    };

    const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    lessons: s.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
                };
            }
            return s;
        }));
    };

    const removeLesson = (sectionId: string, lessonId: string) => {
        setSections(sections.map(s => {
            if (s.id === sectionId) {
                return {
                    ...s,
                    lessons: s.lessons.filter(l => l.id !== lessonId)
                };
            }
            return s;
        }));
    };

    const handleFileUpload = (sectionId: string, lessonId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            updateLesson(sectionId, lessonId, "videoUrl", url);
        }
    };

    const totalVideos = sections.reduce((acc, s) => acc + s.videoCount, 0);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-navy">محتوى الدورة</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {sections.length} أقسام • {totalVideos} فيديو
                    </p>
                </div>
                <Button onClick={addSection} variant="outline" className="gap-2 border-gold text-gold hover:bg-gold hover:text-navy">
                    <Plus size={16} /> إضافة قسم
                </Button>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-100">
                                <button onClick={() => toggleSection(section.id)} className="text-gray-400 hover:text-navy">
                                    {section.isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </button>
                                <span className="font-bold text-gold">#{index + 1}</span>
                                <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                    className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-navy placeholder-gray-400"
                                    placeholder="عنوان القسم (مثلاً: المقدمة)"
                                />

                                {/* Video Count Input */}
                                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2">
                                    <Video size={14} className="text-gold" />
                                    <input
                                        type="number"
                                        value={section.videoCount}
                                        onChange={(e) => updateSectionVideoCount(section.id, parseInt(e.target.value) || 0)}
                                        className="w-12 bg-transparent border-none focus:ring-0 text-center text-sm text-navy font-medium py-1"
                                        min="0"
                                        placeholder="0"
                                    />
                                    <span className="text-xs text-gray-400">فيديو</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeSection(section.id)}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => addLesson(section.id)}
                                        className="bg-navy/5 text-navy hover:bg-navy/10"
                                    >
                                        <Plus size={14} className="ml-1" /> درس
                                    </Button>
                                </div>
                            </div>

                            {/* Lessons List */}
                            {section.isOpen && (
                                <div className="p-2 space-y-2 bg-white">
                                    {section.lessons.length === 0 ? (
                                        <div className="text-center py-6 text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-md">
                                            لا يوجد دروس في هذا القسم
                                        </div>
                                    ) : (
                                        section.lessons.map((lesson, lIndex) => (
                                            <motion.div
                                                key={lesson.id}
                                                layout
                                                className="flex flex-col gap-2 p-3 rounded-md border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-colors group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <GripVertical size={16} className="text-gray-300 cursor-move" />
                                                    <span className="text-xs font-bold text-gray-300">{lIndex + 1}</span>
                                                    <input
                                                        type="text"
                                                        value={lesson.title}
                                                        onChange={(e) => updateLesson(section.id, lesson.id, "title", e.target.value)}
                                                        className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 text-sm"
                                                        placeholder="عنوان الدرس"
                                                    />
                                                    <div className="flex items-center gap-1 text-gray-400">
                                                        <Clock size={12} />
                                                        <input
                                                            type="text"
                                                            value={lesson.duration}
                                                            onChange={(e) => updateLesson(section.id, lesson.id, "duration", e.target.value)}
                                                            className="w-14 bg-transparent border-none focus:ring-0 text-xs text-left"
                                                            placeholder="00:00"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => removeLesson(section.id, lesson.id)}
                                                        className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-500 transition-opacity"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                {/* Video URL Input */}
                                                <div className="flex items-center gap-2 pr-8">
                                                    <Link2 size={14} className="text-gray-400 shrink-0" />
                                                    <input
                                                        type="url"
                                                        value={lesson.videoUrl}
                                                        onChange={(e) => updateLesson(section.id, lesson.id, "videoUrl", e.target.value)}
                                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs text-gray-600 focus:border-gold focus:ring-1 focus:ring-gold/20"
                                                        placeholder="رابط الفيديو (YouTube, Vimeo, أو رابط مباشر)"
                                                        dir="ltr"
                                                    />
                                                    <input
                                                        type="file"
                                                        id={`video-upload-${lesson.id}`}
                                                        className="hidden"
                                                        accept="video/*"
                                                        onChange={(e) => handleFileUpload(section.id, lesson.id, e)}
                                                    />
                                                    <label
                                                        htmlFor={`video-upload-${lesson.id}`}
                                                        className="p-1.5 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer transition-colors"
                                                        title="رفع فيديو"
                                                    >
                                                        <Upload size={14} />
                                                    </label>
                                                    {lesson.videoUrl && (
                                                        <button
                                                            onClick={() => setVideoPreview({ isOpen: true, url: lesson.videoUrl, title: lesson.title })}
                                                            className="p-1.5 rounded-md bg-gold/10 text-gold hover:bg-gold hover:text-navy transition-colors"
                                                            title="معاينة الفيديو"
                                                        >
                                                            <Play size={14} />
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Video Preview Modal */}
            <VideoPreviewModal
                isOpen={videoPreview.isOpen}
                onClose={() => setVideoPreview({ isOpen: false, url: "", title: "" })}
                videoUrl={videoPreview.url}
                title={videoPreview.title}
            />
        </div>
    );
}
