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
            className={`py-16 md:py-20 ${isDark ? "bg-primary" : "bg-paper"
                }`}
        >
            <div className="container mx-auto px-6">
                <div
                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 ${isReversed ? "md:flex-row-reverse" : ""
                        }`}
                >
                    {/* Image Block */}
                    <div className="flex-1 flex justify-center items-center">
                        <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Text Block */}
                    <div className="flex-1 flex flex-col justify-center text-center md:text-right">
                        <h3
                            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight ${isDark ? "text-white" : "text-navy"
                                }`}
                        >
                            {title}
                        </h3>
                        <p
                            className={`text-base md:text-lg leading-relaxed mb-6 line-clamp-2 ${isDark ? "text-white/80" : "text-gray-600"
                                }`}
                        >
                            {description}
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Link
                                href={href}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:gap-4 ${isDark
                                    ? "bg-gold text-navy hover:bg-gold-dim"
                                    : "bg-navy text-white hover:bg-navy-light"
                                    }`}
                            >
                                عرض الدورة
                                <ArrowLeft size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
