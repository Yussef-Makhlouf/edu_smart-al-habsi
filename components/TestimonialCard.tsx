"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  rating?: number;
  className?: string;
  delay?: number;
  featured?: boolean;
}

export function TestimonialCard({
  quote,
  name,
  title,
  rating = 5,
  className,
  delay = 0,
  featured = false,
}: TestimonialCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative transition-all duration-300",
        featured ? "bg-navy text-white" : "bg-white border border-gray-100 hover:border-gold/40",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Decorative quote mark */}
      <div className={cn(
        "absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center",
        featured ? "bg-gold" : "bg-navy"
      )}>
        <Quote className={cn("w-5 h-5", featured ? "text-navy" : "text-gold")} />
      </div>

      {/* Content */}
      <div className="p-8 pt-12">
        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < rating
                  ? "text-gold fill-gold"
                  : featured ? "text-white/20" : "text-gray-200"
              )}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className={cn(
          "text-lg leading-relaxed mb-8",
          featured ? "text-white/90" : "text-navy"
        )}>
          "{quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className={cn(
            "w-12 h-12 flex items-center justify-center font-bold text-lg",
            featured ? "bg-gold text-navy" : "bg-navy text-gold"
          )}>
            {name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className={cn(
              "font-bold",
              featured ? "text-white" : "text-navy"
            )}>{name}</div>
            <div className={cn(
              "text-sm",
              featured ? "text-gold" : "text-gray-500"
            )}>{title}</div>
          </div>

          {/* Decorative line */}
          <div className={cn(
            "w-8 h-px",
            featured ? "bg-gold/30" : "bg-gray-200"
          )} />
        </div>
      </div>
    </motion.div>
  );
}
