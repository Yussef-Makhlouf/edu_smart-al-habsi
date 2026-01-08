"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Image, X, File, Eye } from "lucide-react";

interface UploadedFile {
    id: string;
    name: string;
    type: "pdf" | "image";
    size: string;
    url?: string;
}

export function FileUploadSection() {
    const [files, setFiles] = useState<UploadedFile[]>([
        { id: "1", name: "ملخص_الدورة.pdf", type: "pdf", size: "2.4 MB" },
        { id: "2", name: "الشريحة_الأولى.png", type: "image", size: "540 KB" },
    ]);

    const pdfInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "pdf" | "image") => {
        const uploadedFiles = e.target.files;
        if (!uploadedFiles) return;

        const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: type,
            size: formatFileSize(file.size),
        }));

        setFiles([...files, ...newFiles]);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const removeFile = (id: string) => {
        setFiles(files.filter((f) => f.id !== id));
    };

    const pdfFiles = files.filter((f) => f.type === "pdf");
    const imageFiles = files.filter((f) => f.type === "image");

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy">ملفات الدورة</h2>

            {/* PDF Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-navy flex items-center gap-2">
                        <FileText size={18} className="text-gold" />
                        ملفات PDF
                    </h3>
                    <input
                        type="file"
                        ref={pdfInputRef}
                        accept=".pdf"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "pdf")}
                    />
                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 border-gold text-gold hover:bg-gold hover:text-navy"
                        onClick={() => pdfInputRef.current?.click()}
                    >
                        <Upload size={14} />
                        رفع PDF
                    </Button>
                </div>

                {pdfFiles.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                        <FileText size={32} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-400 text-sm">لا توجد ملفات PDF مرفوعة</p>
                        <p className="text-gray-300 text-xs mt-1">اضغط على زر "رفع PDF" لإضافة ملفات</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {pdfFiles.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <FileText size={18} className="text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-navy">{file.name}</p>
                                        <p className="text-xs text-gray-400">{file.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-gray-400 hover:text-navy transition-colors opacity-0 group-hover:opacity-100">
                                        <Eye size={16} />
                                    </button>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Images Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-navy flex items-center gap-2">
                        <Image size={18} className="text-gold" />
                        الصور والمرفقات
                    </h3>
                    <input
                        type="file"
                        ref={imageInputRef}
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "image")}
                    />
                    <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 border-gold text-gold hover:bg-gold hover:text-navy"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <Upload size={14} />
                        رفع صورة
                    </Button>
                </div>

                {imageFiles.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                        <Image size={32} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-400 text-sm">لا توجد صور مرفوعة</p>
                        <p className="text-gray-300 text-xs mt-1">اضغط على زر "رفع صورة" لإضافة صور</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {imageFiles.map((file) => (
                            <div
                                key={file.id}
                                className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden"
                            >
                                <div className="w-full h-full flex items-center justify-center bg-navy/5">
                                    <Image size={24} className="text-gray-300" />
                                </div>
                                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                                        <Eye size={14} />
                                    </button>
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="p-2 bg-white/20 rounded-full text-white hover:bg-red-500 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-navy/80 to-transparent">
                                    <p className="text-white text-xs truncate">{file.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
