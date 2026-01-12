"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { motion } from "framer-motion";

interface CourseRowAlternatingProps {
    title: string;
    description: string;
    image: string;
    href: string;
    isReversed?: boolean;
    isDark: boolean;
    index?: number;
}

export function CourseRowAlternating({
    title,
    description,
    image,
    href,
    isDark,
    index = 0,
}: CourseRowAlternatingProps) {
    return (
        <section
            className={`relative py-16 md:py-20 overflow-hidden ${isDark ? "bg-navy" : "bg-paper"}`}
        >
            {/* Diagonal stripe pattern for dark sections */}
            {isDark && (
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        background: 'repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(212,175,55,0.3) 80px, rgba(212,175,55,0.3) 81px)'
                    }}
                />
            )}

            {/* Large decorative number */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none select-none">
                <span className={`text-[180px] font-bold leading-none ${isDark ? 'text-white/[0.03]' : 'text-navy/[0.03]'}`}>
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Image Block - Always First (Right in RTL, Top in Mobile) */}
                    <div className="flex justify-center order-1">
                        <div className="relative group">
                            {/* Background decorative square */}
                            <div className={`absolute -top-3 -right-3 w-full h-full ${isDark ? 'bg-gold/10' : 'bg-navy/5'}`} />

                            {/* Main image container */}
                            <div className="relative w-[300px] md:w-[380px] h-[225px] md:h-[285px] overflow-hidden">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 300px, 380px"
                                    priority
                                />

                                {/* Corner cutout */}
                                <div className={`absolute top-0 left-0 w-0 h-0 border-t-[40px] border-r-[40px] border-r-transparent ${isDark ? 'border-t-navy' : 'border-t-paper'}`} />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />

                                {/* Floating badge */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-navy/90 px-3 py-1.5 border-r-2 border-gold">
                                    <Play className="w-3 h-3 text-gold" fill="currentColor" />
                                    <span className="text-white text-xs font-bold">دورة تدريبية</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Block - Always Second (Left in RTL, Bottom in Mobile) */}
                    <div className="flex flex-col justify-center text-center md:text-right order-2">
                        {/* Label */}
                        <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                            <div className={`w-2 h-2 ${isDark ? 'bg-gold' : 'bg-navy'}`} />
                            <div className={`w-8 h-px ${isDark ? 'bg-gold/50' : 'bg-navy/30'}`} />
                            <span className="text-xs font-bold tracking-widest uppercase text-gold">
                                دورة مميزة
                            </span>
                        </div>

                        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight ${isDark ? "text-white" : "text-navy"}`}>
                            {title}
                        </h3>

                        <p className={`text-base md:text-lg leading-relaxed mb-6 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                            {description}
                        </p>

                        {/* CTA Button */}
                        <div className="flex justify-center md:justify-start">
                            <Link href={href} className="group">
                                <div className={`relative inline-flex items-center gap-3 px-8 py-4 font-bold text-sm transition-all duration-300 ${isDark
                                    ? "bg-gold text-navy hover:bg-gold-dim"
                                    : "bg-navy text-white hover:bg-navy-light"
                                    }`}>
                                    <span>عرض الدورة</span>
                                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />

                                    {/* Corner accent */}
                                    <div className={`absolute top-0 left-0 w-0 h-0 border-t-[12px] border-r-[12px] border-r-transparent ${isDark ? 'border-t-navy/20' : 'border-t-gold'
                                        }`} />
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Corner decorative lines */}
            <div className={`absolute bottom-6 right-6 w-px h-12 bg-gradient-to-t to-transparent ${isDark ? 'from-gold/40' : 'from-navy/20'}`} />
            <div className={`absolute bottom-6 right-6 h-px w-12 bg-gradient-to-l to-transparent ${isDark ? 'from-gold/40' : 'from-navy/20'}`} />
        </section>
    );
}
