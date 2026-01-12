"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AnimatedCounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: LucideIcon;
    duration?: number;
    className?: string;
}

export function AnimatedCounter({
    target,
    suffix = "",
    prefix = "",
    label,
    icon: Icon,
    duration = 2,
    className,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);

            // Easing function: easeOutExpo
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeOutExpo * target);

            setCount(currentCount);

            if (now < endTime) {
                requestAnimationFrame(updateCount);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isInView, target, duration]);

    return (
        <motion.div
            ref={ref}
            className={cn(
                "text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-gold/30 transition-all duration-300 group",
                className
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {Icon && (
                <div className="w-14 h-14 mx-auto mb-4 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                </div>
            )}
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
                {prefix}{count.toLocaleString("en-US")}{suffix}
            </div>
            <div className="text-gray-400 text-sm md:text-base font-medium">
                {label}
            </div>
        </motion.div>
    );
}
