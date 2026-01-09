"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
    delay?: number;
}

export function FeatureCard({
    icon: Icon,
    title,
    description,
    className,
    delay = 0,
}: FeatureCardProps) {
    return (
        <motion.div
            className={cn(
                "p-8 bg-white border border-gray-100 rounded-lg hover:border-gold/30 hover:shadow-xl hover:shadow-navy/5 transition-all duration-500 group relative overflow-hidden",
                className
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="w-14 h-14 bg-navy/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-navy group-hover:text-gold transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                    {description}
                </p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold group-hover:w-full transition-all duration-500 ease-out" />
        </motion.div>
    );
}
