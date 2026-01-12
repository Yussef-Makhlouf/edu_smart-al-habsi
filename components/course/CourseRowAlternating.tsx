"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CourseRowAlternatingProps {
    title: string;
    description: string;
    image: string;
    href: string;
    isReversed: boolean; // true = image on left, text on right
    isDark: boolean; // true = dark background section
}

export function CourseRowAlternating({
    title,
    description,
    image,
    href,
    isReversed,
    isDark,
}: CourseRowAlternatingProps) {
    return (
        <section
            className={`py-10 sm:py-14 md:py-20 ${isDark ? "bg-primary" : "bg-paper"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6">
                <div
                    className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 ${isReversed ? "md:flex-row-reverse" : ""
                        }`}
                >
                    {/* Image Block - Enhanced for Mobile */}
                    <div className="w-full md:flex-1 flex justify-center items-center">
                        <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 280px, (max-width: 768px) 384px, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text Block - Enhanced for Mobile */}
                    <div className="w-full md:flex-1 flex flex-col justify-center text-center md:text-right px-2 sm:px-0">
                        <h3
                            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight ${isDark ? "text-white" : "text-navy"
                                }`}
                        >
                            {title}
                        </h3>
                        <p
                            className={`text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-2 ${isDark ? "text-white/80" : "text-gray-600"
                                }`}
                        >
                            {description}
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Link
                                href={href}
                                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 hover:gap-4 ${isDark
                                    ? "bg-gold text-navy hover:bg-gold-dim"
                                    : "bg-navy text-white hover:bg-navy-light"
                                    }`}
                            >
                                عرض الدورة
                                <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
