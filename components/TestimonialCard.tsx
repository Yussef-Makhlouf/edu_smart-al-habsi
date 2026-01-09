"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
    rating?: number;
    className?: string;
    delay?: number;
}

export function TestimonialCard({
    quote,
    name,
    title,
    rating = 5,
    className,
    delay = 0,
}: TestimonialCardProps) {
    return (
        <motion.div
            className={cn(
                "p-8 bg-white border border-gray-100 rounded-lg hover:border-gold/30 hover:shadow-xl hover:shadow-navy/5 transition-all duration-500 group relative",
                className
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {/* Quote icon */}
            <div className="absolute top-6 right-6">
                <Quote className="w-10 h-10 text-gold/20 group-hover:text-gold/40 transition-colors" />
            </div>

            {/* Rating stars */}
            <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={cn(
                            "w-5 h-5",
                            i < rating ? "text-gold fill-gold" : "text-gray-200"
                        )}
                    />
                ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-lg text-navy leading-relaxed mb-8 italic">
                "{quote}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-gold font-bold text-lg">
                    {name.charAt(0)}
                </div>
                <div>
                    <div className="font-bold text-navy">{name}</div>
                    <div className="text-sm text-gold">{title}</div>
                </div>
            </div>
        </motion.div>
    );
}
