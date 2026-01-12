"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  number?: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  number = "01",
  className,
  delay = 0,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white border border-gray-100 hover:border-gold/50 transition-colors duration-200",
        className
      )}
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-gold border-r-[40px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Number badge - Top right */}
      <div className="absolute -top-3 -right-3 w-14 h-14 bg-navy flex items-center justify-center">
        <span className="text-gold font-bold text-sm">{number}</span>
      </div>

      {/* Content */}
      <div className="p-8 pt-10">
        {/* Icon */}
        <div className="mb-6">
          <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>

        {/* Bottom accent line */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-100 group-hover:bg-gold/30 transition-colors" />
          <Icon className="w-4 h-4 text-gray-300 group-hover:text-gold transition-colors" />
        </div>
      </div>
    </div>
  );
}
