import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Eye, Award, Calendar, Share2 } from "lucide-react";
import Image from "next/image";

// Mock Data
const certificates = [
  {
    id: "cert-001",
    courseTitle: "أسرار القيادة الاستراتيجية",
    instructor: "د. محمد الحبسي",
    issueDate: "15 يناير 2024",
    grade: "متمـيز",
    imageUrl: "/certificate-placeholder.jpg", // We'll simulate a certificate preview
  },
];

export default function MyCertificatesPage() {
  return (
    <main className="bg-paper min-h-screen flex flex-col">
      <Navbar lightVariant={true} />

      <div className="flex-1 container mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">
              شهاداتي المعتمدة
            </h1>
            <p className="text-gray-500">
              وثّق إنجازاتك وشارك نجاحك مع العالم.
            </p>
          </div>

          {/* Stats Summary */}
          <div className="flex gap-6 bg-white p-4 rounded-lg border border-gray-100 ">
            <div className="text-center">
              <span className="block text-2xl font-bold text-gold">1</span>
              <span className="text-xs text-gray-400">الشهادات</span>
            </div>
            <div className="h-10 w-px bg-gray-100"></div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-navy">0</span>
              <span className="text-xs text-gray-400">قيد الإصدار</span>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300"
            >
              {/* Certificate Preview (Visual) */}
              <div className="aspect-[1.4/1] bg-navy/5 relative overflow-hidden flex items-center justify-center p-6 bg-pattern">
                <div className="absolute inset-0 bg-navy opacity-0 group-hover:opacity-10 transition-opacity z-10" />

                {/* Mock Certificate SVG/Div */}
                <div className="w-full h-full bg-white border-8 border-double border-gold/30  flex flex-col items-center justify-center text-center p-4 relative">
                  <Award className="text-gold mb-2 w-8 h-8" />
                  <h3 className="text-navy font-bold font-serif text-sm px-2">
                    {cert.courseTitle}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-1">
                    منحت إلى: محمد علي
                  </p>

                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <Award size={80} />
                  </div>
                </div>

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-[1px]">
                  <Button
                    size="sm"
                    className="bg-white text-navy hover:bg-gold hover:text-white transition-colors"
                  >
                    <Eye size={16} className="mr-2" /> معاينة
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-bold text-navy text-lg line-clamp-1 mb-1">
                  {cert.courseTitle}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  المدرب: {cert.instructor}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar size={14} /> تاريخ الإصدار
                    </span>
                    <span className="text-navy font-medium">
                      {cert.issueDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Award size={14} /> التقدير
                    </span>
                    <span className="text-gold font-bold">{cert.grade}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full border-navy/20 text-navy hover:bg-navy hover:text-white group-hover:border-navy"
                  >
                    <Download size={16} className="mr-2" /> تحميل
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <Share2 size={16} className="mr-2" /> مشاركة
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Placeholder (Optional, ensures grid looks good) */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <Award size={32} />
            </div>
            <h3 className="font-bold text-gray-400 mb-1">شهادة قادمة</h3>
            <p className="text-sm text-gray-400 max-w-[200px]">
              أكمل دوراتك الحالية لتحصل على شهادات جديدة تضاف هنا.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
