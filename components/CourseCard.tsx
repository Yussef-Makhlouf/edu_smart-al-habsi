import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
    title: string;
    description: string;
    image: string;
    category: string;
    price: string;
    href: string;
}

export function CourseCard({ title, description, image, category, price, href }: CourseCardProps) {
    return (
        <div className="group relative bg-white border border-gray-100 hover:border-gold/30 transition-all duration-500 overflow-hidden flex flex-col h-full  hover:shadow-gold/10">
            {/* Image Container with Zoom Effect */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 right-4 z-10 bg-navy/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold border border-gold/20">
                    {category}
                </div>
                <div className="w-full h-full bg-gray-100 group-hover:scale-105 transition-transform duration-700 ease-out">
                    {/* Placeholder for image */}
                    <div className="w-full h-full bg-navy/10 flex items-center justify-center text-navy/30">
                        صورة الدورة
                    </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/20 transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow bg-white">
                <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1"><Star size={12} className="text-gold fill-gold" /> 4.9</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="flex items-center gap-1"><Clock size={12} /> 12 ساعة</span>
                </div>

                <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-gold">{price}</span>
                    <Link href={href} className="flex items-center gap-2 text-navy font-bold text-sm tracking-wide group-hover:translate-x-[-5px] transition-transform hover:text-gold">
                        تفاصيل الدورة <ArrowLeft size={16} />
                    </Link>
                </div>
            </div>

            {/* Bottom Color Line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold group-hover:w-full transition-all duration-500 ease-in-out" />
        </div>
    )
}
