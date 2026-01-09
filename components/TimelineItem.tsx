"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    icon?: string;
    isLast?: boolean;
    index?: number;
}

export function TimelineItem({
    year,
    title,
    description,
    icon = "🎯",
    isLast = false,
    index = 0,
}: TimelineItemProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className={cn(
                "relative flex items-center gap-8",
                isEven ? "flex-row" : "flex-row-reverse"
            )}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        >
            {/* Content side */}
            <div className={cn("flex-1", isEven ? "text-right" : "text-left")}>
                <div
                    className={cn(
                        "p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-gold/30 transition-colors inline-block max-w-md",
                        isEven ? "ml-auto" : "mr-auto"
                    )}
                >
                    <span className="text-3xl mb-3 block">{icon}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </div>
            </div>

            {/* Center line and year dot */}
            <div className="relative flex flex-col items-center">
                {/* Year badge */}
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-lg shadow-lg shadow-gold/30 z-10">
                    {year}
                </div>

                {/* Connecting line */}
                {!isLast && (
                    <div className="w-0.5 h-32 bg-gradient-to-b from-gold to-gold/20 mt-4" />
                )}
            </div>

            {/* Empty side for balance */}
            <div className="flex-1" />
        </motion.div>
    );
}

// Simplified vertical timeline for mobile
export function TimelineItemMobile({
    year,
    title,
    description,
    icon = "🎯",
    isLast = false,
    index = 0,
}: TimelineItemProps) {
    return (
        <motion.div
            className="relative flex gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Left side - line and dot */}
            <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-navy font-bold text-sm shadow-lg shadow-gold/30 z-10 shrink-0">
                    {year}
                </div>
                {!isLast && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-gold to-gold/20 mt-2" />
                )}
            </div>

            {/* Right side - content */}
            <div className="flex-1 pb-8">
                <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                    <span className="text-2xl mb-2 block">{icon}</span>
                    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}
